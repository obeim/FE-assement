"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchStore } from "../../store/searchStore";
import { searchPodcasts } from "../../utils/api";
import { Podcast } from "../../types/podcast";
import Loading from "../../app/search/loading";
import TopPodcastsSection from "./TopPodcastsSection";
import TopEpisodesSection from "./TopEpisodesSection";

export default function SearchPageClient({
  initialTerm,
  initialResults = [],
  success,
}: {
  initialTerm: string;
  initialResults: Podcast[];
  success: boolean;
}) {
  const { term } = useSearchStore();
  const [results, setResults] = useState<Podcast[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!success);

  useEffect(() => {
    if (!term || term === initialTerm) {
      setResults(initialResults);
      return;
    }

    setLoading(true);
    searchPodcasts(term)
      .then((data) => {
        setResults(data.data);
        setError(!data.success);
      })

      .finally(() => setLoading(false));
  }, [term]);

  return (
    <div className="space-y-4">
      {loading && <Loading />}
      {!error && !loading && (
        <Fragment>
          {results.length > 0 && (
            <Fragment>
              <TopPodcastsSection results={results} initialTerm={initialTerm} />
              <TopEpisodesSection results={results} initialTerm={initialTerm} />
            </Fragment>
          )}
          {results.length == 0 && (
            <p className="text-center text-white/70 py-10">
              {term || initialTerm
                ? `No results for “${term || initialTerm}”`
                : "Type something to search"}
            </p>
          )}
        </Fragment>
      )}

      {error && !loading && (
        <div className="text-red-300/80 text-center flex flex-col items-center justify-center h-80">
          Something Went Wrong, Please Try Again later
        </div>
      )}

      <div className=" h-10"></div>
    </div>
  );
}
