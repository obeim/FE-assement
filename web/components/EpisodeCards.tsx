import Image from "next/image";
import { Podcast } from "../types/podcast";
import CustomDropdownMenu from "./DropdownMenu";
import { useMemo } from "react";
import { cardSubtitlColors } from "../utils/constants";
import Play from "../icons/Play";
import { pickHashedColor } from "../utils/helpers";

interface cardProps {
  episode: Podcast;
}

export const EpisodeCard = ({ episode }: cardProps) => {
  const bgColors = [
    "linear-gradient(to bottom right,#785033cc,#78503366)",
    "linear-gradient(to bottom right,#80406Bcc,#80406B66)",
    "linear-gradient(to bottom right,#404080cc,#40408066)",
  ];

  const pickbgColor = useMemo(() => {
    return pickHashedColor(episode.trackId, bgColors);
  }, [episode.trackId]);

  const subtitleColor = useMemo(() => {
    return pickHashedColor(episode.trackId, cardSubtitlColors);
  }, [episode.trackId]);

  return (
    <div
      className="group relative rounded transition-all  cursor-pointer
    duration-300 overflow-hidden shadow-[inset_0_1px_1px_hsl(240,10%,20%),_0_2px_4px_rgba(0,0,0,0.05)]"
    >
      <span
        className="absolute inset-0 opacity-20 z-0 group-hover:opacity-40"
        style={{ background: pickbgColor }}
      />
      <div className="flex gap-3  relative z-10">
        <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden group/image">
          <Image
            src={episode.artworkUrl}
            alt={episode.trackName}
            fill
            className="object-cover"
          />
          <div className="group-hover/image:flex hidden justify-center items-center z-10 absolute w-full h-full  bg-black/60">
            <Play />
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between p-3">
          <div>
            <p
              style={{ color: subtitleColor }}
              className="text-[11px] text-gray-400 line-clamp-1 mb-1 font-medium"
            >
              {episode.artistName}
            </p>

            <h3 className="text-[13px] font-semibold text-white line-clamp-2 leading-snug">
              {episode.trackName}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-[#cfd0d3] font-medium">
            <span>Feb 6</span>
            <span>31min</span>
          </div>
        </div>

        <div>
          <CustomDropdownMenu
            options={[
              { label: "Add to Queue", onClick() {} },
              { label: "Save Episode", onClick() {} },
              { label: "Share Episode", onClick() {} },
            ]}
            className={{ threeDots: "!h-5" }}
          />
        </div>
      </div>
    </div>
  );
};

export const EpisodeCardCompact = ({ episode }: cardProps) => {
  const subtitleColor = useMemo(() => {
    return pickHashedColor(episode.trackId, cardSubtitlColors);
  }, [episode.trackId]);

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-black/40 transition-colors group border-b-[1px] border-b-[#24242A] cursor-pointer">
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
          className={{ threeDots: "!h-5" }}
        />
      </div>
    </div>
  );
};

export const EpisodeCardList = ({ episode }: cardProps) => {
  const subtitleColor = useMemo(() => {
    return pickHashedColor(episode.trackId, cardSubtitlColors);
  }, [episode.trackId]);

  return (
    <div className="flex gap-4 p-3 rounded hover:bg-black/40 transition-colors border-b border-white/5 group cursor-pointer">
      <Image
        src={episode.artworkUrl}
        alt={episode.trackName}
        width={100}
        height={100}
        className="rounded flex-shrink-0 md:w-[100px] md:h-[100px] w-14 h-14"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-base ">
          {episode.trackName}
        </h3>
        <p
          style={{ color: subtitleColor }}
          className="text-[12px] text-gray-400 line-clamp-1"
        >
          {episode.artistName}
        </p>
        <div className="flex items-center gap-2 text-[12px] text-[#cfd0d3] font-medium mt-5">
          <span>Feb 6</span>
          <span>31min</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="p-2 rounded-full hover:bg-white/10 hover:text-white text-white/30 cursor-pointer ">
          <Play className="w-[12px] h-[12px]  " />
        </div>
        <CustomDropdownMenu
          options={[
            { label: "Add to Queue", onClick() {} },
            { label: "Save Episode", onClick() {} },
          ]}
          className={{ threeDots: "!h-5" }}
        />
      </div>
    </div>
  );
};
