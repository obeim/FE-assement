"use client";

import { useEffect, useState } from "react";
import PodcastResults from "./PodcastResults";
import { useSearchStore } from "../../store/searchStore";
import { searchPodcasts } from "../../utils/api";
import { Podcast } from "../../types/podcast";
import Loading from "./loading";

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
      <h1 className="text-white font-semibold px-4 pt-5">
        Top podcasts for {term || initialTerm || "..."}
      </h1>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <PodcastResults results={results} />
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
