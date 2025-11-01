import { beforeEach, describe, expect, MockedFunction, test, vi } from "vitest";
import SearchController from "./search.controller";
import { searchItunes } from "../services/itunes.service";
import { Podcast } from "@prisma/client";

vi.mock("../services/itunes.service.ts", () => ({
  searchItunes: vi.fn(),
}));

const mockedSearchItunes = vi.mocked(searchItunes);

const prismaMock = {
  searchTerm: {
    upsert: vi.fn(),
    findUnique: vi.fn(),
  },
  podcast: {
    createMany: vi.fn(),
  },
};

const fastifyMock = {
  prisma: prismaMock,
  log: { error: vi.fn() },
};

const podcastMockData: Podcast[] = [
  { trackId: 1, trackName: "test", artistName: "test", artworkUrl: "test" },
];

const mockItunesReturnValue = [
  {
    trackId: 1,
    trackName: "test",
    artistName: "test",
    artworkUrl: "test",
    artworkUrl600: "test600",
  },
];

describe("Search controller", () => {
  let searchController: SearchController;

  beforeEach(() => {
    vi.resetAllMocks();
    searchController = new SearchController(fastifyMock as any);
  });

  test("should return 400 when term is missing", async () => {
    const mockRequest = { query: {} };
    const mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    await searchController.search(mockRequest as any, mockReply as any);
    expect(mockReply.status).toHaveBeenCalledWith(400);
  });

  test("should return cached podcasts when term exist", async () => {
    const mockRequest = { query: { term: "test" } };
    const mockReply = {};

    prismaMock.searchTerm.findUnique.mockReturnValue({
      podcasts: podcastMockData,
    });

    await expect(
      searchController.search(mockRequest as any, mockReply as any)
    ).resolves.toEqual(podcastMockData);

    expect(prismaMock.searchTerm.findUnique).toHaveBeenCalledWith({
      where: { term: "test" },
      include: { podcasts: true },
    });
  });

  test("should fetch from itunes when not cached", async () => {
    const mockRequest = { query: { term: "test" } };
    const mockReply = {};

    prismaMock.searchTerm.findUnique.mockReturnValue(undefined);
    mockedSearchItunes.mockResolvedValue(mockItunesReturnValue);

    await searchController.search(mockRequest as any, mockReply as any);
    expect(mockedSearchItunes).toHaveBeenCalledWith("test");
  });

  test("should return 502 and log error when itunes api fails", async () => {
    const mockRequest = { query: { term: "test" } };
    const mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };

    prismaMock.searchTerm.findUnique.mockReturnValue(undefined);
    mockedSearchItunes.mockRejectedValue(new Error("Failed"));

    await searchController.search(mockRequest as any, mockReply as any);
    expect(fastifyMock.log.error).toHaveBeenCalledWith(
      "Failed",
      "iTunes search failed"
    );
    expect(mockReply.status).toHaveBeenCalledWith(502);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "iTunes search failed",
    });
  });

  test("should handle empty itunes data correctly", async () => {
    const mockRequest = { query: { term: "test" } };
    const mockReply = {};

    prismaMock.searchTerm.findUnique.mockReturnValue(undefined);
    mockedSearchItunes.mockResolvedValue([]);

    await expect(
      searchController.search(mockRequest as any, mockReply as any)
    ).resolves.toEqual([]);
  });

  test("should transform and saves itunes data correctly", async () => {
    const mockRequest = { query: { term: "test" } };
    const mockReply = {};
    const podcastsData = mockItunesReturnValue.map((item) => ({
      trackId: item.trackId,
      trackName: item.trackName,
      artistName: item.artistName,
      artworkUrl: item.artworkUrl600,
    }));

    prismaMock.searchTerm.findUnique.mockReturnValue(undefined);
    mockedSearchItunes.mockResolvedValue(mockItunesReturnValue);

    await expect(
      searchController.search(mockRequest as any, mockReply as any)
    ).resolves.toEqual(podcastsData);
  });
});
