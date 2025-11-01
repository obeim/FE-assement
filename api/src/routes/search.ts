import { FastifyInstance } from "fastify";
import SearchController from "../controller/search.controller";

export default async function searchRoutes(fastify: FastifyInstance) {
  const searchController = new SearchController(fastify);
  fastify.get("/search", searchController.search);
}
