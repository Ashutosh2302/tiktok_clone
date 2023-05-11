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
import LikeButton from "./LikeButton";
import { BsPenFill } from "react-icons/bs";

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

  const [postDupicate, setPost] = useState(post);

  const [captionModalOpen, setCaptionModalOpen] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [editing, setEditing] = useState(false);

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

  const handleEditCaption = async () => {
    setEditing(true);
    await axios
      .put(`${BASE_URL}/api/caption/${post._id}`, {
        caption: editedCaption,
      })
      .then(() => {
        setCaptionModalOpen(false);
        setEditing(false);
        setPost({
          ...postDupicate,
          caption: editedCaption,
        });
      });
  };

  const handleLike = async (like: boolean) => {
    setPost({
      ...postDupicate,
      likes: like
        ? (postDupicate.likes || []).concat([
            {
              _id: userProfile._id,
              userName: userProfile.userName,
              image: userProfile.image,
            },
          ])
        : postDupicate.likes.filter((like) => like._id !== userProfile._id),
    });

    if (userProfile) {
      await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6 lg:w-[700px] h-[450px] md:h-[600px] lg:h-[725px] w-[270px]">
      <div className="flex max-sm:gap-1 md:gap-2 gap-20">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-12 md:h-12 w-7 h-7">
            <Link href={`/profile/${post?.postedBy._id}`}>
              <Image
                src={post.postedBy.image}
                width={20}
                height={20}
                className="rounded-full"
                layout="responsive"
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-12 my-3 flex gap-5">
        <div>
          <p className="font-normal">{postDupicate.caption}</p>
        </div>
        <div>
          {userProfile && post.postedBy._id === userProfile._id && (
            <button onClick={() => setCaptionModalOpen(true)}>
              <BsPenFill className="hover:text-[#F51997]" />
            </button>
          )}
        </div>
      </div>
      <div className="lg:ml-10 flex gap-4 relative w-fit">
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
              className="lg:w-[600px] h-[280px] md:h-[400px] lg:h-[528px] w-[270px] rounded-2xl cursor-pointer bg-gray-100"
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

      <div className="flex justify-start lg:ml-10 max-sm:justify-between max-sm:w-[250px] sm:w-[250px] sm:justify-between lg:w-[600px]">
        <div className="lg:w-6/12">
          {userProfile && (
            <LikeButton
              likes={postDupicate.likes}
              onLike={() => handleLike(true)}
              onDislike={() => handleLike(false)}
              showLikeCount={false}
            />
          )}
        </div>

        {userProfile && userProfile?._id === post.postedBy._id && (
          <div className="lg:text-3xl text-2xl w-fit flex justify-end lg:w-6/12 pt-2">
            <button onClick={() => setModalOpen(true)}>
              <AiFillDelete className="hover:text-[#F51997]" />
            </button>
          </div>
        )}
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
        {captionModalOpen && (
          <Modal
            size="small"
            onClose={() => {
              setCaptionModalOpen(false);
            }}
            heading="Edit caption"
          >
            <input
              defaultValue={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              className="bg:primary outline-black border-2 w-[380px]"
            />
            <div className="flex gap-6 mt-8">
              <button
                type="button"
                disabled={editing}
                className={`${
                  editing ? "bg-gray-300" : "bg-[#F51997]"
                } text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none`}
                onClick={handleEditCaption}
              >
                {editing ? (
                  <ImSpinner2 className="animate-spin text-2xl w-full" />
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                className={`bg-gray-300 text-black text-md font-medium p-2 rounded w-28 lg:w-44 outline-none`}
                onClick={() => {
                  setCaptionModalOpen(false);
                  setEditedCaption((prev) => prev);
                }}
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
