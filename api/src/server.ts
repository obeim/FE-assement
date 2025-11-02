import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import searchRoutes from "./routes/search";
import fastifyCors from "@fastify/cors";

const setupServer = async () => {
  const server = Fastify({ logger: true });

  server.register(fastifyCors);

  server.register(prismaPlugin);

  server.register(searchRoutes);

  server.get("/", async () => {
    return { message: "API is running" };
  });

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";

  try {
    await server.listen({ port, host });
    server.log.info(`Server listening on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

setupServer();
