import { CustomScrollbar } from "../../components/CustomScrollBar";
import PodcastCard from "../../components/PodcastCard";
import { useCustomScrollbar } from "../../hooks/useCustomScrollbar";
import { Podcast } from "../../types/podcast";

export default function PodcastResults({
  results,
  layout,
}: {
  results: Podcast[];
  layout: "scroll" | "grid";
}) {
  const {
    scrollContainerRef,
    scrollPercentage,
    showScrollbar,
    handleScrollbarClick,
    handleThumbMouseDown,
    getThumbWidth,
    containerRect,
    isDragging,
  } = useCustomScrollbar([results]);

  return (
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
  );
}
