import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useEffect, useRef, useState } from "react";
import BreedOption from "./BreedOption";

const BreedSelector = ({ breedOptions }) => {
  const [expanded, setExpanded] = useState(false);
  const [sortBreed, setSortBreed] = useState(breedOptions);
  const [search, setSearch] = useState("");
  const optionsRef = useRef(null);

  useEffect(() => {
    setSortBreed(
      breedOptions.filter((elem) =>
        elem.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, breedOptions]);

  useOutsideClose(optionsRef, () => {
    setExpanded(false);
  });
  return (
    <div className="w-56" ref={optionsRef}>
      <div className="input-wrapper">
        <label htmlFor="breed-options" className="label">
          Breed
        </label>
        <input
          id="breed-options"
          className="input"
          type="text"
          onClick={() => setExpanded(true)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div
        className={`flex flex-col border bg-white overflow-auto h-96 ${
          expanded ? "block" : "hidden"
        }`}
      >
        {sortBreed.length > 0 &&
          sortBreed.map((breed) => <BreedOption breed={breed} key={breed} />)}
      </div>
    </div>
  );
};

export default BreedSelector;
