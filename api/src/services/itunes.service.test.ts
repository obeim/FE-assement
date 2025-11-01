import { describe, test, vi, expect, beforeEach } from "vitest";
import { searchItunes } from "./itunes.service";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
      })),
    },
  };

  return mockAxios;
});
const mockReturnValue = [
  {
    trackId: 1,
    artistName: "test",
    trackName: "test",
    artworkUrl600: "test",
  },
];

describe("Itunes Api Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("should fetch podcasts successfully", async () => {
    mocks.get.mockReturnValue({ data: { results: mockReturnValue } });
    await expect(searchItunes("test")).resolves.toEqual(mockReturnValue);
  });

  test("should pass correct search paramter", async () => {
    mocks.get.mockReturnValue({ data: { results: mockReturnValue } });
    await expect(searchItunes("test")).resolves.toEqual(mockReturnValue);

    expect(mocks.get).toHaveBeenCalledWith("/search", {
      params: { term: "test", media: "podcast" },
    });
  });

  test("should throw an error on failure", async () => {
    mocks.get.mockRejectedValue(new Error("Network Error"));
    await expect(searchItunes("test")).rejects.toThrowError("Network Error");
  });
});
