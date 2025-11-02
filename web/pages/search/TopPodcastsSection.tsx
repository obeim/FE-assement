"use client";

import Arrows from "../../components/Arrows";
import CustomDropdownMenu from "../../components/DropdownMenu";
import { useCustomScrollbar } from "../../hooks/useCustomScrollbar";
import { useSearchStore } from "../../store/searchStore";
import { Podcast } from "../../types/podcast";
import PodcastCard from "../../components/PodcastCard";
import { CustomScrollbar } from "../../components/CustomScrollBar";
import usePersistentLayout from "../../hooks/usePersistentLayout";
import { Skeleton } from "../../components/Skeleton";

const TopPodcastsSection = ({
  initialTerm,
  results = [],
}: {
  initialTerm: string;
  results: Podcast[];
}) => {
  const { term } = useSearchStore();

  const { layout, setLayout, isInitialized } = usePersistentLayout(
    "top_podcasts_layout",
    "scroll"
  );

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
  } = useCustomScrollbar([results, layout]);

  return (
    <section>
      <div className="flex justify-between items-center w-full px-4 pt-5 pb-3  md:sticky snap-start z-20 bg-background/90 border-b border-white/10 top-10 ">
        <h1 className="text-white font-semibold text-[16px]">
          Top podcasts for {term || initialTerm}
        </h1>
        <div className="inline-flex gap-3 items-center justify-center">
          {layout === "scroll" && (
            <Arrows
              forward={() => handleScroll("forward")}
              back={() => handleScroll("back")}
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
                },
              },
            ]}
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`pr-4 pl-2 pt-4 no-scrollbar ${
          layout === "grid"
            ? "grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 w-full"
            : "flex gap-1 sm:gap-6 overflow-x-auto"
        }`}
        style={layout === "scroll" ? { overflowY: "clip" } : {}}
      >
        {(results || []).map((pod) => (
          <div
            key={pod.trackId}
            className={`relative ${
              layout === "scroll" ? "flex-shrink-0 w-[233px]" : "mx-auto w-full"
            }`}
          >
            {isInitialized ? (
              <PodcastCard podcast={pod} />
            ) : (
              <Skeleton className="w-[233px] h-[233px]" />
            )}
          </div>
        ))}
      </div>

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
    </section>
  );
};

export default TopPodcastsSection;
