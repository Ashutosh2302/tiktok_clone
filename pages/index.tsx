import VideoCard from "../components/VideoCard";
import axios from "axios";
import { Video } from "../types";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

interface Props {
  videos: Video[];
}
const Home: React.FC<Props> = ({ videos }) => {
  console.log({ videos });
  console.log(videos.length);
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text="No Videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/` + `${topic ? `discover/${topic}` : "post"}`
  );

  return { props: { videos: data } };
};

export default Home;
