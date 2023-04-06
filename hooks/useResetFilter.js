import {
  selectedAgeState,
  selectedBreedsState,
  selectedSortingState,
  selectedZipCodesState,
} from "@/atoms/searchParamsState";
import { useResetRecoilState } from "recoil";

export const useResetFilter = () => {
  const resetZipCode = useResetRecoilState(selectedZipCodesState);
  const resetBreeds = useResetRecoilState(selectedBreedsState);
  const resetAge = useResetRecoilState(selectedAgeState);
  const resetSort = useResetRecoilState(selectedSortingState);

  const resetFilter = () => {
    resetZipCode();
    resetBreeds();
    resetAge();
    resetSort();
  };

  return resetFilter;
};
