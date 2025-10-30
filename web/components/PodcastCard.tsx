import Image from "next/image";
import { Podcast } from "../types/podcast";
import ThreeDots from "./icons/ThreeDots";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <div className="rounded shadow-sm hover:shadow-md transition lg:w-[233px] md:w-[150px] w-[100px] mx-auto relative">
      <Image
        src={podcast.artworkUrl}
        alt={podcast.trackName}
        width={233}
        height={233}
        className="mb-3 rounded object-cover lg:w-[233px] lg:h-[233px] md:w-[150px] md:h-[150px]  w-[100px] h-[100px]"
      />
      <ThreeDots className="absolute -right-2 bottom-4 fill-white/40 hover:fill-white cursor-pointer h-5 z-10" />

      <h3 className="font-semibold text-white text-sm line-clamp-1 w-[90%]">
        {podcast.trackName}
      </h3>
      <p className=" text-foreground-highlightRed text-xs font-semibold  line-clamp-1">
        {podcast.artistName}
      </p>
    </div>
  );
}
