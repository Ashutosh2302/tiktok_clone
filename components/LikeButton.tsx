import { User } from "../types";
import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { Modal } from "./Modal/Modal";
import Image from "next/image";
import Link from "next/link";

interface Props {
  likes: User[];
  onLike: () => void;
  onDislike: () => void;
}

const LikeButton: React.FC<Props> = ({ likes, onLike, onDislike }) => {
  const { userProfile, allUsers }: any = useAuthStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const [likesMenuOpen, setLikesMenuOpen] = useState(false);

  const isLiked = likes?.some((item) => item._id === userProfile?._id);

  useEffect(() => {
    if (isLiked) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [isLiked, likes]);

  const renderLikeText = () => {
    let text = "";
    if (isLiked) {
      text = "You";
    } else text = `Liked by ${likes[0].userName.split(" ")[0]}`;

    if (likes.length > 1)
      text =
        text +
        ` and ${likes.length - 1} other${likes.length - 1 > 1 ? "s" : ""}`;

    return text;
  };

  return (
    <>
      <div className="my-2">
        {likes && likes.length !== 0 && (
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => setLikesMenuOpen(true)}
          >
            <MdFavorite className="text-lg text-[#F51997]" />
            <p className="text-gray-500 text-xs h-12 h-2 hover:text-[#F51997]">
              {renderLikeText()}
            </p>
          </div>
        )}

        <div className="flex gap-6">
          <div className="mt-2 flex flex-col justify-center items-center cursor-pointer">
            {alreadyLiked ? (
              <div className="flex gap-2" onClick={onDislike}>
                <div className="bg-primary rounded-full p-2 text-[#F51997]">
                  <MdFavorite className="text-lg md:text-2xl text-[#F51997]" />
                </div>
                <div className="flex items-center text-[#F51997]">Like</div>
              </div>
            ) : (
              <div className="flex gap-2" onClick={onLike}>
                <div className="bg-primary rounded-full p-2 md:p-2">
                  <MdFavorite className="text-lg md:text-2xl" />
                </div>
                <div className="flex items-center">Like</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {likesMenuOpen && (
        <Modal
          size="small"
          onClose={() => setLikesMenuOpen(false)}
          heading="Likes"
        >
          {likes.map((like) => (
            <Link href={`/profile/${like._id}`}>
              <div className="flex gap-3 my-2 cursor-pointer">
                <div>
                  <Image
                    src={like.image}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </div>
                <div>{like.userName}</div>
              </div>
            </Link>
          ))}
        </Modal>
      )}
    </>
  );
};

export default LikeButton;
