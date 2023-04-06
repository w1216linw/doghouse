import { errorState, isSearchedState } from "@/atoms/pageState";
import useAutoLogin from "@/hooks/useAutoLogin";
import { fetchBreeds } from "@/utility/fetchBreeds";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Logout from "../auth/Logout";
import FilterSidebar from "./dogs/FilterSidebar";
import MatchedDogs from "./dogs/MatchedDogs";
import AgeSelector from "./searchBar/AgeSelector";
import BreedSelector from "./searchBar/BreedSelector";
import MatchBtn from "./searchBar/MatchBtn";
import SearchBtn from "./searchBar/SearchBtn";
import SortingSelector from "./searchBar/SortingSelector";
import ZipCodeSelector from "./searchBar/ZipCodeSelector";

const Main = () => {
  const [breedOptions, setBreedOptions] = useState([]);
  const isSearched = useRecoilValue(isSearchedState);
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    fetchBreeds().then((res) => {
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setBreedOptions(res);
      }
    });
  }, []);

  useAutoLogin(setError);

  if (error)
    return (
      <div className="grid place-items-center h-screen">
        <div className="text-center">
          <h1 className="mb-12 text-4xl">Error: {error}</h1>
          <Link href="/" className="underline text-2xl">
            try again
          </Link>
        </div>
      </div>
    );
  return (
    <main data-testid="main">
      <header className="relative h-[50em]">
        <Image
          src="/dogandhuman.jpg"
          alt="My Image"
          sizes="100vw"
          fill
          className="object-cover"
        />
        <Logout />
        <div className="search-bar flex justify-center z-50">
          <ZipCodeSelector />
          <AgeSelector />
          <BreedSelector breedOptions={breedOptions} />
          <SortingSelector />
          {isSearched ? <MatchBtn /> : <SearchBtn />}
        </div>
      </header>
      <div className="bg-yellow-200 h-12 mb-20">
        <p>{error && error}</p>
      </div>
      {!isSearched ? (
        <p className="text-center text-4xl">
          Search for your ideal four-legged friends
        </p>
      ) : (
        <section className="max-w-[70rem] mx-auto flex pb-5 px-5">
          <FilterSidebar />
          <MatchedDogs />
        </section>
      )}
    </main>
  );
};

export default Main;
