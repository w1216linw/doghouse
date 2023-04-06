import { selectedBreedsState } from "@/atoms/searchParamsState";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useRecoilState } from "recoil";

const BreedOption = ({ breed }) => {
  const [selectedBreeds, setSelectedBreeds] =
    useRecoilState(selectedBreedsState);

  const handleSelectChange = (breed, isChecked) => {
    if (isChecked) {
      setSelectedBreeds([...selectedBreeds, breed]);
    } else {
      setSelectedBreeds(selectedBreeds.filter((item) => item !== breed));
    }
  };

  const isChecked = selectedBreeds.includes(breed);

  return (
    <div
      onClick={() => handleSelectChange(breed, !isChecked)}
      className={`flex items-center border-t gap-2 p-2 md:text-lg hover:bg-gray-100 ${
        isChecked && "text-blue-400"
      }`}
    >
      <div className="w-4">
        {isChecked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
      </div>
      <span>{breed}</span>
    </div>
  );
};

export default BreedOption;
