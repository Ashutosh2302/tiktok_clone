import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface Props {
  likes: any[];
  onLike: () => void;
  onDislike: () => void;
  showLikeCount?: boolean;
}

const LikeButton: React.FC<Props> = ({
  likes,
  onLike,
  onDislike,
  showLikeCount = true,
}) => {
  const { userProfile, allUsers }: any = useAuthStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const isLiked = likes?.some((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (isLiked) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [isLiked, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-2 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 text-[#F51997]"
            onClick={onDislike}
          >
            <MdFavorite className="text-lg md:text-2xl text-[#F51997]" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-2" onClick={onLike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        {showLikeCount && (
          <p className="text-md font-semibold mb-2">{likes?.length || 0}</p>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
