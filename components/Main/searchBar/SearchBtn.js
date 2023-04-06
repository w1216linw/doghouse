import { errorState, isSearchedState, pageState } from "@/atoms/pageState";
import {
  selectedAgeState,
  selectedBreedsState,
  selectedSortingState,
  selectedZipCodesState,
} from "@/atoms/searchParamsState";
import { fetchDogIds } from "@/utility/fetchDogIds";
import { searchParam } from "@/utility/searchParam";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SearchBtn = () => {
  const zipCodes = useRecoilValue(selectedZipCodesState);
  const age = useRecoilValue(selectedAgeState);
  const breeds = useRecoilValue(selectedBreedsState);
  const sort = useRecoilValue(selectedSortingState);
  const setCurrentPage = useSetRecoilState(pageState);
  const setIsSearched = useSetRecoilState(isSearchedState);
  const setError = useSetRecoilState(errorState);

  const handleSearch = () => {
    fetchDogIds(searchParam(zipCodes, age, breeds, sort)).then((res) => {
      if (res instanceof Error) {
        setError(res.message);
      } else {
        setIsSearched(true);
        setCurrentPage(res);
      }
    });
  };

  return (
    <button
      className="py-2 px-7 border rounded-md h-16 md:text-lg bg-green-400 text-gray-50 font-bold"
      onClick={handleSearch}
    >
      Search
    </button>
  );
};

export default SearchBtn;
