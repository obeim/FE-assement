import axios from "axios";
import http from "http";
import https from "https";

export interface Track {
  trackId: number;
  artistName: string;
  trackName: string;
  artworkUrl600: string;
}

export const axiosInstance = axios.create({
  baseURL: "https://itunes.apple.com",
  httpAgent: new http.Agent({ keepAlive: false }),
  httpsAgent: new https.Agent({ keepAlive: false }),
  timeout: 5000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    Accept: "application/json",
  },
});

export async function searchItunes(term: string) {
  const response = await axiosInstance.get<{ results: Track[] }>("/search", {
    params: { term, media: "podcast" },
  });
  return response.data.results;
}
