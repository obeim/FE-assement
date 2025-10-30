import { Podcast } from "../types/podcast";

export async function searchPodcasts(term: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search?term=${encodeURIComponent(term)}`
  );
  if (!res.ok) {
    let message = "Request failed";
    try {
      const body = await res.json();
      message = body?.message ?? message;
    } catch (_) {
      // ignore parse error
    }
    return { success: false, data: [] as Podcast[], message };
  }
  const data = (await res.json()) as Podcast[];
  return { success: true, data };
}
