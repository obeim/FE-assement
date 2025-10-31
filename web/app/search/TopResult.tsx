import { Podcast } from "../../types/podcast";

const TopResult = ({ topResult }: { topResult: Podcast }) => {
  return (
    <div className=" w-full ">
      <div className="flex gap-10 w-full pt-4 px-4 ">
        <div className="bg-black/50 md:w-1/2 w-full md:h-[204px] 2xl:h-[229px] rounded-md overflow-hidden flex md:flex-row flex-col">
          <img
            className="xl:w-[229px] xl:h-[229px] lg:w-[204px] lg:h-[204px] md:w-[120px] md:h-[120px] w-full h-full object-cover"
            alt="artwork Url"
            src={topResult?.artworkUrl}
          />
          <div className="pt-2 pb-5 px-3">
            <h2 className="text-white font-bold text-lg mt-4">
              {topResult?.trackName}
            </h2>
            <p className="text-foreground text-sm mt-2 ">
              {topResult?.artistName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopResult;
