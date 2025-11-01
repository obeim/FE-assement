import { Listinglayouts } from "../types/podcast";

export const episodeLayoutConfig = {
  grid: {
    containerClass:
      "grid gap-6 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 w-full",
    needsScrollbar: false,
    cardWrapperClass: "relative mx-auto w-full",
  },
  scroll: {
    containerClass: "flex gap-6 overflow-x-auto",
    needsScrollbar: true,
    cardWrapperClass: "relative flex-shrink-0 w-[358px]",
  },
  compact: {
    containerClass: "grid grid-cols-3 w-full ",
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
