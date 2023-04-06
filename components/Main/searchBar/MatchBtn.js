import { errorState } from "@/atoms/pageState";
import { likedDogsState, matchedDogState } from "@/atoms/userState";
import { fetchMatch } from "@/utility/fetchMatch";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const MatchBtn = () => {
  const likedDogs = useRecoilValue(likedDogsState);
  const router = useRouter();
  const setError = useSetRecoilState(errorState);
  const isValid = useMemo(() => likedDogs.length > 0, [likedDogs]);

  const setMatchedDog = useSetRecoilState(matchedDogState);

  const handleMatch = () => {
    const ids = likedDogs.map((dog) => dog.id);
    fetchMatch(ids).then((res) => {
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setMatchedDog(likedDogs.find((elem) => elem.id === res.match));
        router.push("/matched");
      }
    });
  };

  return (
    <button
      disabled={!isValid}
      className={`py-2 px-7 border rounded-md h-16 md:text-lg text-gray-50 font-bold ${
        isValid ? "bg-blue-400" : "bg-gray-400"
      }`}
      onClick={handleMatch}
    >
      Match
    </button>
  );
};

export default MatchBtn;
