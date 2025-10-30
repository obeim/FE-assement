import { FastifyInstance } from "fastify";
import { searchItunes } from "../services/itunes.service";
import { Podcast } from "@prisma/client";
import SearchController from "../controller/search.controller";

export default async function searchRoutes(fastify: FastifyInstance) {
  const searchController = new SearchController(fastify);
  fastify.get("/search", searchController.search);
}
