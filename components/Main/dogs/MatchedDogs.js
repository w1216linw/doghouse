import { errorState, pageState } from "@/atoms/pageState";
import { useResetFilter } from "@/hooks/useResetFilter";
import { fetchDogIds } from "@/utility/fetchDogIds";
import { fetchDogs } from "@/utility/fetchDogs";
import { searchParamSlice } from "@/utility/searchParam";
import { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useRecoilState, useSetRecoilState } from "recoil";
import DogCard from "./DogCard";

const MatchedDogs = () => {
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const [dogs, setDogs] = useState([]);
  const resetFilter = useResetFilter();
  const setError = useSetRecoilState(errorState);

  const handlePage = async (dir) => {
    if (dir === "next") {
      fetchDogIds(searchParamSlice(currentPage.next)).then((res) => {
        if (res instanceof Error) {
          setError(res.message);
        } else {
          setCurrentPage(res);
        }
      });
    } else {
      fetchDogIds(searchParamSlice(currentPage.prev)).then((res) => {
        if (res instanceof Error) {
          setError(res.message);
        } else {
          setCurrentPage(res);
        }
      });
    }
  };
  useEffect(() => {
    if (currentPage.resultIds?.length > 0) {
      fetchDogs(currentPage.resultIds).then((res) => {
        if (res instanceof Error) {
          setError(res.message);
        } else {
          setDogs(res);
        }
      });
    }
  }, [currentPage]);

  if (currentPage.total < 1) {
    return (
      <div className="text-center mx-auto space-y-2">
        <p className="text-3xl font-bold">We didn't find any dogs</p>
        <button
          className="px-3 py-1 bg-blue-300 rounded-xl"
          onClick={resetFilter}
        >
          Remove all filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow pl-4 border-l-2 flex flex-col justify-between">
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {dogs.length > 0 &&
          dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}
      </div>
      <div className="flex my-5">
        <button
          onClick={() => handlePage("prev")}
          className={`pageBtn ${currentPage?.prev ? "inline-flex" : "hidden"}`}
        >
          <p className="sr-only">previous page</p>
          <IoIosArrowDropleft className="text-5xl" />
        </button>
        <button
          onClick={() => handlePage("next")}
          className={`pageBtn ml-auto ${
            currentPage?.next && currentPage.resultIds.length > 24
              ? "inline-flex"
              : "hidden"
          }`}
        >
          <p className="sr-only">next page</p>
          <IoIosArrowDropright className="text-5xl" />
        </button>
      </div>
    </div>
  );
};

export default MatchedDogs;
