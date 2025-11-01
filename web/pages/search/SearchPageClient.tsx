"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "../../store/searchStore";
import { searchPodcasts } from "../../utils/api";
import { Podcast } from "../../types/podcast";
import Loading from "../../app/search/loading";
import TopResult from "./TopResult";
import DropdownMenu from "../../components/DropdownMenu";
import { useCustomScrollbar } from "../../hooks/useCustomScrollbar";
import { CustomScrollbar } from "../../components/CustomScrollBar";
import PodcastCard from "../../components/PodcastCard";
import Arrows from "../../components/Arrows";

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

            <TopResult {...results[0]} />
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

  const {
    scrollContainerRef,
    scrollPercentage,
    showScrollbar,
    handleScrollbarClick,
    handleThumbMouseDown,
    getThumbWidth,
    handleScroll,
    containerRect,
    isDragging,
  } = useCustomScrollbar([results]);

  return (
    <section>
      <div className="flex justify-between items-center w-full px-4 pt-5 pb-3  md:sticky snap-start z-20 bg-background/90 border-b border-white/10 top-10 ">
        <h1 className="text-white font-semibold ">
          Top podcasts for {term || initialTerm}
        </h1>
        <div className="inline-flex gap-3 items-center justify-center">
          {layout === "scroll" && (
            <Arrows
              forward={() => {
                handleScroll("forward");
              }}
              back={() => {
                handleScroll("back");
              }}
            />
          )}

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
      </div>

      <div
        ref={scrollContainerRef}
        className={`pr-4 pl-2 pt-4 no-scrollbar overflow-x-scroll w-full max-w-full grid ${
          layout === "grid"
            ? " gap-6 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
            : "grid-flow-col gap-6"
        } `}
      >
        {results.map((pod) => (
          <div key={pod.trackId} className="mx-auto w-full relative">
            <PodcastCard podcast={pod} />
          </div>
        ))}

        {layout === "scroll" && showScrollbar && (
          <CustomScrollbar
            scrollPercentage={scrollPercentage}
            thumbWidth={getThumbWidth()}
            onScrollbarClick={handleScrollbarClick}
            onThumbMouseDown={handleThumbMouseDown}
            containerRect={containerRect}
            isDragging={isDragging}
          />
        )}
      </div>
    </section>
  );
};
