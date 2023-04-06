import {
  selectedAgeState,
  selectedBreedsState,
  selectedSortingState,
  selectedZipCodesState,
} from "@/atoms/searchParamsState";
import { useRecoilState, useSetRecoilState } from "recoil";

import { errorState, pageState } from "@/atoms/pageState";
import { fetchDogIds } from "@/utility/fetchDogIds";
import { searchParam } from "@/utility/searchParam";
import { useEffect } from "react";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import DeleteBtn from "./DeleteBtn";
import FilterOptionWrapper from "./FilterOptionWrapper";

const FilterSidebar = () => {
  const setCurrentPage = useSetRecoilState(pageState);

  const [sort, setSort] = useRecoilState(selectedSortingState);
  const [age, setAge] = useRecoilState(selectedAgeState);
  const [selectedBreeds, setSelectedBreeds] =
    useRecoilState(selectedBreedsState);
  const [zipCodes, setZipCodes] = useRecoilState(selectedZipCodesState);
  const setError = useSetRecoilState(errorState);
  const onDeleteBreed = (del) => {
    setSelectedBreeds(selectedBreeds.filter((elem) => elem !== del));
  };
  const onDeleteZipCode = (del) => {
    setZipCodes(zipCodes.filter((elem) => elem !== del));
  };
  const onDeleteMinAge = () => setAge({ ...age, min: 0 });
  const onDeleteMaxAge = () => setAge({ ...age, max: 20 });
  const onDeleteSort = () => setSort("");

  useEffect(() => {
    fetchDogIds(searchParam(zipCodes, age, selectedBreeds, sort)).then(
      (res) => {
        if (res instanceof Error) {
          setError(res.message);
        } else {
          setCurrentPage(res);
        }
      }
    );
  }, [age, selectedBreeds, zipCodes, sort]);

  return (
    <div className="w-52 pr-4">
      <FilterOptionWrapper option="Zip Code">
        {zipCodes.length > 0 &&
          zipCodes.map((zipCode) => (
            <DeleteBtn key={zipCode} onDelete={onDeleteZipCode} del={zipCode}>
              <p>{zipCode}</p>
            </DeleteBtn>
          ))}
      </FilterOptionWrapper>
      <FilterOptionWrapper option="Breed">
        {selectedBreeds.length > 0 &&
          selectedBreeds.map((breed) => (
            <DeleteBtn key={breed} onDelete={onDeleteBreed} del={breed}>
              <p className="truncate whitespace-nowrap w-3/4 text-left">
                {breed}
              </p>
            </DeleteBtn>
          ))}
      </FilterOptionWrapper>

      <FilterOptionWrapper option="Age">
        {age.min > 0 && (
          <DeleteBtn onDelete={onDeleteMinAge}>
            <div className="flex gap-2 flex-grow">
              <p>Min:</p>
              <p>{age.min}</p>
            </div>
          </DeleteBtn>
        )}
        {age.max < 20 && (
          <DeleteBtn onDelete={onDeleteMaxAge}>
            <div className="flex gap-2 flex-grow">
              <p>Max:</p>
              <p>{age.max}</p>
            </div>
          </DeleteBtn>
        )}
      </FilterOptionWrapper>

      <FilterOptionWrapper option="Sort">
        {sort !== "" && (
          <DeleteBtn onDelete={onDeleteSort}>
            <div className="flex items-center gap-2">
              <p className="capitalize">{sort.split(":")[0]}</p>
              {sort.split(":")[1] === "asc" ? <RiSortAsc /> : <RiSortDesc />}
            </div>
          </DeleteBtn>
        )}
      </FilterOptionWrapper>
    </div>
  );
};

export default FilterSidebar;
