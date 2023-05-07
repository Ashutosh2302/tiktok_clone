import { BASE_URL } from "../../utils";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../../store/authStore";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { User, Video } from "../../types";
import Image from "next/image";
import { useRouter } from "next/router";
import SuggestedAccounts from "../../components/SuggestedAccounts";
import Link from "next/link";

interface Props {
  videos: Video[];
}

const Search: React.FC<Props> = ({ videos }) => {
  const { allUsers } = useAuthStore();
  const router = useRouter();
  const { query }: any = router.query;
  const [isAccounts, setIsAccounts] = useState(false);

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers.filter((user: User) =>
    user.userName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full">
      {" "}
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>

        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: User, idx) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 mt-2">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="User profile"
                    />
                  </div>
                  <div className="hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(" ", "")}{" "}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No accounts results for ${query}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video, idx) => <VideoCard post={video} key={idx} />)
          ) : (
            <NoResults text={`No videos results for ${query}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { query },
}: {
  params: { query: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${query}`);
  return { props: { videos: res.data } };
};

export default Search;
