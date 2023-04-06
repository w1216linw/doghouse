import { errorState } from "@/atoms/pageState";
import { matchedDogState } from "@/atoms/userState";
import { fetchLocation } from "@/utility/fetchLocation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useRecoilValue, useSetRecoilState } from "recoil";

const MatchedDog = () => {
  const dog = useRecoilValue(matchedDogState);
  const [location, setLocation] = useState("");
  const [isShow, setIsShow] = useState("");
  const setError = useSetRecoilState(errorState);
  useEffect(() => {
    fetchLocation([dog.zip_code]).then((res) => {
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setLocation(res[0]);
      }
    });
  }, [dog, setError]);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5 relative">
      <Link
        href="/"
        className="absolute top-2 left-2 text-3xl text-blue-400 hover:text-gray-500"
      >
        <IoIosArrowBack />
      </Link>
      <h1
        className="font-serif font-bold
      lg:text-5xl"
      >
        Congratulations on your match!
      </h1>
      <div className="grid grid-cols-2 max-w-3xl z-10 border w-full h-full max-h-[28rem] shadow-md relative">
        <div className="relative">
          <Image
            src={dog.img}
            fill
            sizes="100vw"
            alt={dog.name}
            className="object-cover"
          />
        </div>
        <div className="p-5 flex flex-col ">
          <div className="lg:text-lg">
            <h2 className="font-semibold lg:text-4xl">{dog.name}</h2>
            <p className="font-semibold lg:text-2xl mb-2">{dog.breed}</p>
            <p>
              <span>Age: </span>
              {dog.age > 0 ? `${dog.age} years old` : "under a year old"}
            </p>
            <p>
              {location.city}, {location.state} {location.zip_code}
            </p>
          </div>
          <button
            className="mt-auto bg-orange-200 rounded-lg py-2 font-semibold text-lg hover:bg-orange-300 active:scale-95 transition"
            onClick={() => setIsShow(true)}
          >
            Adopt Me!
          </button>
          <div
            className={`flex flex-col items-center justify-center absolute inset-0 space-y-5 bg-gray-200 lg:text-lg ${
              isShow ? "block" : "hidden"
            } `}
          >
            <h1 className="text-5xl">Contact Us</h1>
            <p>Make an appointment to meet the dog</p>
            <div>
              <p>Adopt Id: 987987</p>
              <p>Phone: 123-456-7890</p>
              <p>Email: exmple@email.com</p>
            </div>
            <button
              onClick={() => setIsShow(false)}
              className="absolute top-1 right-2 text-5xl text-red-400"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedDog;
