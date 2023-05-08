import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils";
import useAuthStore from "../store/authStore";
import { AiFillDelete } from "react-icons/ai";
import { Modal } from "./Modal/Modal";
import { ImSpinner2 } from "react-icons/im";
interface Props {
  post: Video;
}
const VideoCard: React.FC<Props> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const [modalOpen, setModalOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const handleDeletePost = async () => {
    setDeleting(true);
    await axios.delete(`${BASE_URL}/api/post/${post._id}`);
    router.push("/");
  };
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div className="flex max-sm:gap-1 md:gap-2 gap-20">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`profile/${post.postedBy._id}`}>
              <Image
                src={post.postedBy.image}
                width={62}
                height={62}
                className="rounded-full"
                layout="responsive"
              />
            </Link>
          </div>
          <div>
            <Link href={`profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>

                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${post._id}`}>
              <p className="mt-2 font-normal ">{post.caption}</p>
            </Link>
          </div>
        </div>
        {userProfile?._id === post.postedBy._id && (
          <div className="max-sm:text-md ml-auto max-sm:ml-2 text-2xl flex w-[100px]">
            <button onClick={() => setModalOpen(true)}>
              <AiFillDelete className="hover:text-[#F51997] " />
            </button>
          </div>
        )}
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            />
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <>
        {modalOpen && (
          <Modal
            heading="Delete post"
            onClose={() => setModalOpen(false)}
            size="big"
          >
            <p className="text-gray-600">
              Please hit confirm if you really want to delete the post
            </p>
            <div className="flex gap-6 mt-8">
              <button
                type="button"
                className={`${
                  deleting ? "bg-gray-300" : "bg-[#F51997]"
                } text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none`}
                disabled={deleting}
                onClick={handleDeletePost}
              >
                {deleting ? (
                  <ImSpinner2 className="animate-spin text-2xl w-full" />
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                className={`bg-gray-300 text-black text-md font-medium p-2 rounded w-28 lg:w-44 outline-none`}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </>
    </div>
  );
};

export default VideoCard;
