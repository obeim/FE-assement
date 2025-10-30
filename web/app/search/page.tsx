// app/search/page.tsx
import { Podcast } from "../../types/podcast";
import { searchPodcasts } from "../../utils/api";
import SearchPageClient from "./SearchPageClient";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = await searchParams;

  const initialResults: { success: boolean; data: Podcast[] } = q
    ? await searchPodcasts(q)
    : { success: false, data: [] };

  return (
    <SearchPageClient
      initialTerm={q || ""}
      initialResults={initialResults.data}
    />
  );
}
