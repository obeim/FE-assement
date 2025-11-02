// app/search/page.tsx
import { Podcast } from "../../types/podcast";
import { searchPodcasts } from "../../utils/api";
import SearchPageClient from "../../pages/search/SearchPageClient";

type SearchParams = {
  q?: string;
};

type Props = {
  params: Promise<{}>;
  searchParams: Promise<SearchParams>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const initialResults: { success: boolean; data: Podcast[] } = q
    ? await searchPodcasts(q as string)
    : { success: true, data: [] };

  return (
    <SearchPageClient
      initialTerm={(q as string) || ""}
      initialResults={initialResults.data}
      success={initialResults.success}
    />
  );
}

export const dynamic = "force-dynamic";
