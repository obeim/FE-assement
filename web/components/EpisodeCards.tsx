import Image from "next/image";
import { Podcast } from "../types/podcast";
import CustomDropdownMenu from "./DropdownMenu";
import { useMemo } from "react";
import { cardSubtitlColors } from "../utils/constants";

interface cardProps {
  episode: Podcast;
}

export const EpisodeCard = ({ episode }: cardProps) => {
  const bgColors = [
    "#1b1b31",
    "#22202b",
    "#211b2e",
    "#201d28",
    "#221b2c",
    "#1e1b2f",
  ];

  const pickbgColor = useMemo(() => {
    const index =
      Math.abs(
        episode.trackId
          .toString()
          .split("")
          .reduce((acc, char) => {
            return acc + char.charCodeAt(0);
          }, 0)
      ) % bgColors.length;
    return bgColors[index];
  }, [episode.trackId]);

  return (
    <div
      style={{ backgroundColor: pickbgColor }}
      className="group relative  rounded-lg transition-all duration-300"
    >
      <div className="flex gap-3 p-3">
        <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={episode.artworkUrl}
            alt={episode.trackName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 line-clamp-1 mb-1">
              {episode.artistName}
            </p>

            <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
              {episode.trackName}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Feb 6</span>
            <span>•</span>
            <span>31min</span>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <CustomDropdownMenu
            options={[
              { label: "Add to Queue", onClick() {} },
              { label: "Save Episode", onClick() {} },
              { label: "Share Episode", onClick() {} },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export const EpisodeCardCompact = ({ episode }: cardProps) => {
  const subtitleColor = useMemo(() => {
    const index =
      Math.abs(
        episode.trackId
          .toString()
          .split("")
          .reduce((acc, char) => {
            return acc + char.charCodeAt(0);
          }, 0)
      ) % cardSubtitlColors.length;
    return cardSubtitlColors[index];
  }, [episode.trackId]);

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-black/40 transition-colors group border-b-[1px] border-b-[#24242A]">
      <Image
        src={episode.artworkUrl}
        alt={episode.trackName}
        width={50}
        height={50}
        className="rounded "
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-[14px] line-clamp-1">
          {episode.trackName}
        </h3>
        <p
          style={{ color: subtitleColor }}
          className="text-[12px] text-gray-400 line-clamp-1"
        >
          {episode.artistName}
        </p>
      </div>
      <div>
        <CustomDropdownMenu
          options={[
            { label: "Add to Queue", onClick() {} },
            { label: "Save Episode", onClick() {} },
          ]}
        />
      </div>
    </div>
  );
};

export const EpisodeCardList = ({ episode }: cardProps) => {
  return (
    <div className="flex gap-4 p-3 rounded hover:bg-white/5 transition-colors border-b border-white/5 group">
      <Image
        src={episode.artworkUrl}
        alt={episode.trackName}
        width={80}
        height={80}
        className="rounded flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-base mb-1">
          {episode.trackName}
        </h3>
      </div>
      <div className="flex items-start opacity-0 group-hover:opacity-100 transition-opacity">
        <CustomDropdownMenu
          options={[
            { label: "Add to Queue", onClick() {} },
            { label: "Save Episode", onClick() {} },
          ]}
        />
      </div>
    </div>
  );
};
