import { likedDogsState } from "@/atoms/userState";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";

const Liked = ({ dog }) => {
  const [likedDogs, setLikedDogs] = useRecoilState(likedDogsState);

  const [isLiked, setIsLiked] = useState(false);

  const onLikeDog = () => {
    if (!isLiked) {
      setLikedDogs([...likedDogs, dog]);
    } else {
      setLikedDogs(likedDogs.filter((elem) => elem.id !== dog.id));
    }
  };

  useEffect(() => {
    setIsLiked(likedDogs.find((elem) => elem.id === dog.id) !== undefined);
  }, [likedDogs]);

  return (
    <button
      onClick={onLikeDog}
      className={`absolute top-2 right-2 text-[2rem] bg-gray-300 bg-opacity-50 rounded-full p-2 ${
        isLiked ? "text-red-400" : "text-red-200"
      }`}
    >
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default Liked;
