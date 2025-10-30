import PodcastCard from "../../components/PodcastCard";
import { Podcast } from "../../types/podcast";

export default function PodcastResults({ results }: { results: Podcast[] }) {
  return (
    <div className="grid w-full px-4 gap-6 min-h-screen grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
      {results.map((pod) => (
        <div key={pod.trackId} className="max-w-xs mx-auto w-full">
          <PodcastCard podcast={pod} />
        </div>
      ))}
    </div>
  );
}
