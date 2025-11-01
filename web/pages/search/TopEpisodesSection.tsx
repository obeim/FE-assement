"use client";

import Arrows from "../../components/Arrows";
import { CustomScrollbar } from "../../components/CustomScrollBar";
import CustomDropdownMenu from "../../components/DropdownMenu";
import {
  EpisodeCard,
  EpisodeCardCompact,
  EpisodeCardList,
} from "../../components/EpisodeCards";

import { useCustomScrollbar } from "../../hooks/useCustomScrollbar";
import usePersistentLayout from "../../hooks/usePersistentLayout";
import { useSearchStore } from "../../store/searchStore";
import { Listinglayouts, Podcast } from "../../types/podcast";
import { getEpisodeLayoutConfig } from "../../utils/episodeLayoutConfig";

const EPISODE_CARD_COMPONENTS = {
  grid: EpisodeCard,
  scroll: EpisodeCard,
  compact: EpisodeCardCompact,
  list: EpisodeCardList,
} as const;

const TopEpisodesSection = ({
  initialTerm,
  results,
}: {
  initialTerm: string;
  results: Podcast[];
}) => {
  const { term } = useSearchStore();
  const { layout, setLayout } = usePersistentLayout(
    "top_episodes_layout",
    "compact"
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

  const config = getEpisodeLayoutConfig(layout as Listinglayouts);
  const CardComponent =
    EPISODE_CARD_COMPONENTS[(layout as Listinglayouts) || "compact"];

  return (
    <section>
      <div className="flex justify-between items-center w-full px-4 pt-5 pb-3 md:sticky snap-start z-20 bg-background/90 border-b border-white/10 top-10">
        <h1 className="text-white font-semibold text-[16px]">
          Top episodes for {term || initialTerm}
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
              { label: "Grid View", value: "grid" },
              { label: "Scroll View", value: "scroll" },
              { label: "Compact View", value: "compact" },
              { label: "List View", value: "list" },
            ]
              .filter((option) => option.value !== layout)
              .map((option) => ({
                label: option.label,
                onClick: () => setLayout(option.value as Listinglayouts),
              }))}
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={` no-scrollbar ${config?.containerClass}`}
        style={layout === "scroll" ? { overflowY: "clip" } : {}}
      >
        {results.map((episode) => (
          <div key={episode.trackId} className={config?.cardWrapperClass}>
            <CardComponent episode={episode} />
          </div>
        ))}
      </div>

      {config?.needsScrollbar && showScrollbar && (
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

export default TopEpisodesSection;
