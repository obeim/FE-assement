"use client";

import { useEffect, useState } from "react";
import PodcastResults from "./PodcastResults";
import { useSearchStore } from "../../store/searchStore";
import { searchPodcasts } from "../../utils/api";
import { Podcast } from "../../types/podcast";
import Loading from "./loading";
import TopResult from "./TopResult";
import DropdownMenu from "../../components/DropdownMenu";

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
          <section>
            <div className="flex w-full px-4 pt-5 pb-3  md:sticky snap-start z-10 bg-background/90 border-b border-white/10 top-10 ">
              <h1 className="text-white font-semibold ">
                Top result for {term || initialTerm}
              </h1>
            </div>

            <TopResult topResult={results[0]} />
          </section>
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

const TopPodcastsSection = ({
  initialTerm,
  results,
}: {
  initialTerm: string;
  results: Podcast[];
}) => {
  const { term } = useSearchStore();

  const [layout, setLayout] = useState<"scroll" | "grid">("grid");

  return (
    <section>
      <div className="flex justify-between items-center w-full px-4 pt-5 pb-3  md:sticky snap-start z-20 bg-background/90 border-b border-white/10 top-10 ">
        <h1 className="text-white font-semibold ">
          Top podcasts for {term || initialTerm}
        </h1>
        <DropdownMenu
          options={[
            {
              label:
                layout === "grid"
                  ? "Switch Layout to Scroll"
                  : "Switch Layout to Grid",
              onClick() {
                setLayout(layout === "grid" ? "scroll" : "grid");
              },
            },
          ]}
        />
      </div>
      <PodcastResults results={results} layout={layout} />
    </section>
  );
};
