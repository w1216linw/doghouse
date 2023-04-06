import { selectedSortingState } from "@/atoms/searchParamsState";
import { useEffect, useState } from "react";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import { useRecoilState } from "recoil";

const SortingOption = ({ option, setExpanded }) => {
  const [selectSort, setSelectSort] = useRecoilState(selectedSortingState);
  const [active, setActive] = useState();

  const onChangeSort = () => {
    setSelectSort(option.join(":"));
    setExpanded(false);
  };

  useEffect(() => {
    setActive(selectSort === option.join(":"));
  }, [selectSort, setActive]);
  return (
    <button
      onClick={onChangeSort}
      className={`hover:bg-slate-200 flex justify-between items-center gap-2 ${
        active && "text-blue-400"
      }`}
    >
      <p className="capitalize">{option[0]}</p>
      {option[1] === "asc" ? <RiSortAsc /> : <RiSortDesc />}
    </button>
  );
};

export default SortingOption;
