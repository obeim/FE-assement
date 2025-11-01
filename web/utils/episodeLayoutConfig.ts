import { Listinglayouts } from "../types/podcast";

export const episodeLayoutConfig = {
  grid: {
    containerClass:
      "pr-4 pl-2 pt-4 no-scrollbar grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full pr-4 pl-2",
    needsScrollbar: false,
    cardWrapperClass: "relative mx-auto w-full",
  },
  scroll: {
    containerClass: "flex gap-6 overflow-x-auto mt-3 pr-4 pl-2",
    needsScrollbar: true,
    cardWrapperClass: "relative flex-shrink-0 w-[358px]",
  },
  compact: {
    containerClass: "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full ",
    needsScrollbar: false,
    cardWrapperClass: "relative  mx-1",
  },
  list: {
    containerClass: "flex flex-col w-full",
    needsScrollbar: false,
    cardWrapperClass: "relative",
  },
} as const;

export function getEpisodeLayoutConfig(layout: Listinglayouts) {
  return episodeLayoutConfig[layout];
}
