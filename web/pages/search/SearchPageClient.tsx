"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "../../store/searchStore";
import { searchPodcasts } from "../../utils/api";
import { Podcast } from "../../types/podcast";
import Loading from "../../app/search/loading";
import TopPodcastsSection from "./TopPodcastsSection";

export default function SearchPageClient({
  initialTerm,
  initialResults,
}: {
  initialTerm: string;
  initialResults: Podcast[];
}) {
  const { term } = useSearchStore();
  const [results, setResults] = useState<Podcast[]>(initialResults);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!term || term === initialTerm) {
      setResults(initialResults);
      return;
    }

    setLoading(true);
    searchPodcasts(term)
      .then((data) => setResults(data.data))
      .finally(() => setLoading(false));
  }, [term]);

  return (
    <div className="space-y-4">
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <>
          <TopPodcastsSection results={results} initialTerm={initialTerm} />
        </>
      ) : (
        <p className="text-center text-white/70 py-10">
          {term || initialTerm
            ? `No results for “${term || initialTerm}”`
            : "Type something to search"}
        </p>
      )}
    </div>
  );
}
