import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { searchItunes } from "../services/itunes.service";
import { Podcast } from "@prisma/client";

class SearchController {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;

    this.search = this.search.bind(this);
  }

  async search(request: FastifyRequest, reply: FastifyReply) {
    const { term } = request.query as { term: string };

    if (!term) return reply.status(400).send({ message: "term is required" });

    const existingTerm = await this.fastify.prisma.searchTerm.findUnique({
      where: { term },
      include: { podcasts: true },
    });

    if (existingTerm) {
      return existingTerm.podcasts;
    }

    let data;
    try {
      data = await searchItunes(term);
    } catch (err: any) {
      this.fastify.log.error(err.message, "iTunes search failed");
      return reply.status(502).send({ message: "iTunes search failed" });
    }

    const podcastsData = data.map((item) => ({
      trackId: item.trackId,
      trackName: item.trackName,
      artistName: item.artistName,
      artworkUrl: item.artworkUrl600,
    }));

    if (podcastsData.length > 0) {
      await this.fastify.prisma.podcast.createMany({
        data: podcastsData,
        skipDuplicates: true,
      });

      await this.fastify.prisma.searchTerm.upsert({
        where: { term },
        create: {
          term,
          podcasts: {
            connect: podcastsData.map((p: Podcast) => ({ trackId: p.trackId })),
          },
        },
        update: {
          podcasts: {
            connect: podcastsData.map((p: Podcast) => ({ trackId: p.trackId })),
          },
        },
      });
    }

    return podcastsData;
  }
}

export default SearchController;
