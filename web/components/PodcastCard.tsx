import Image from "next/image";
import { Podcast } from "../types/podcast";
import { memo, useMemo } from "react";
import DropdownMenu from "./DropdownMenu";
import { cardSubtitlColors } from "../utils/constants";

function PodcastCard({ podcast }: { podcast: Podcast }) {
  const subtitleColor = useMemo(() => {
    const index =
      Math.abs(
        podcast.trackId
          .toString()
          .split("")
          .reduce((acc, char) => {
            return acc + char.charCodeAt(0);
          }, 0)
      ) % cardSubtitlColors.length;
    return cardSubtitlColors[index];
  }, [podcast.trackId]);

  return (
    <div
      className="rounded shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
                mx-auto relative  md:w-full w-[90%]"
    >
      <Image
        src={podcast.artworkUrl}
        alt={podcast.trackName}
        width={233}
        height={233}
        className="mb-3 rounded object-cover transition-all duration-300 ease-in-out
               w-full aspect-square"
      />
      <div className="absolute -right-3 bottom-4 fill-white/40 hover:fill-white cursor-pointer h-5 z-10">
        <DropdownMenu
          options={[
            { label: "Add to My Podcasts", onClick() {} },
            { label: "Go to Podcast", onClick() {} },
            { label: "Share Podcast", onClick() {} },
            { label: "Hide Podcast", onClick() {} },
          ]}
        />
      </div>
      <h3 className="font-semibold text-white text-[14px] line-clamp-1 w-[90%]">
        {podcast.trackName}
      </h3>
      <p
        style={{ color: subtitleColor }}
        className=" text-[12px] font-semibold  line-clamp-1"
      >
        {podcast.artistName}
      </p>
    </div>
  );
}

export default memo(
  PodcastCard,
  (prev, current) => prev.podcast.trackId === current.podcast.trackId
);
