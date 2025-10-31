import PodcastCard from "../../components/PodcastCard";
import { Podcast } from "../../types/podcast";

export default function PodcastResults({
  results,
  layout,
}: {
  results: Podcast[];
  layout: "scroll" | "grid";
}) {
  return (
    <>
      <div className="pr-4 pl-2 pt-4 no-scrollbar grid !grid-rows-1 gap-6 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 w-full max-w-full">
        {results.map((pod) => (
          <div key={pod.trackId} className="max-w-xs mx-auto w-full relative  ">
            <PodcastCard podcast={pod} />
          </div>
        ))}
      </div>
    </>
  );
}
