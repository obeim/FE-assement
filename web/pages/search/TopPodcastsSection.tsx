"use client";

import { useEffect, useState } from "react";
import Arrows from "../../components/Arrows";
import CustomDropdownMenu from "../../components/DropdownMenu";
import { useCustomScrollbar } from "../../hooks/useCustomScrollbar";
import { useSearchStore } from "../../store/searchStore";
import { Listinglayouts, Podcast } from "../../types/podcast";
import PodcastCard from "../../components/PodcastCard";
import { CustomScrollbar } from "../../components/CustomScrollBar";

const TopPodcastsSection = ({
  initialTerm,
  results,
}: {
  initialTerm: string;
  results: Podcast[];
}) => {
  const { term } = useSearchStore();

  const [layout, setLayout] = useState<Listinglayouts>();

  useEffect(() => {
    setLayout(
      (localStorage.getItem("top_podcasts_layout") as Listinglayouts) ||
        "scroll"
    );
  }, []);

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

          <CustomDropdownMenu
            options={[
              {
                label:
                  layout === "grid"
                    ? "Switch Layout to Scroll"
                    : "Switch Layout to Grid",
                onClick() {
                  setLayout(layout === "grid" ? "scroll" : "grid");
                  localStorage.setItem(
                    "top_podcasts_layout",
                    layout === "grid" ? "scroll" : "grid"
                  );
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

export default TopPodcastsSection;
