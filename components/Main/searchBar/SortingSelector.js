import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useRef, useState } from "react";
import SortingOption from "./SortingOption";
const sortOptions = [
  ["breed", "asc"],
  ["breed", "desc"],
  ["age", "asc"],
  ["age", "desc"],
];

const SortingSelector = () => {
  const [expanded, setExpanded] = useState(false);

  const optionsRef = useRef(null);

  useOutsideClose(optionsRef, () => {
    setExpanded(false);
  });
  return (
    <div className="w-16 relative" ref={optionsRef}>
      <button
        id="sorting"
        className="input-wrapper w-full font-semibold text-blue-400"
        onClick={() => setExpanded(!expanded)}
      >
        Sort
      </button>
      <div
        className={`flex flex-col border bg-white w-max h-auto absolute -bottom-2 p-2 translate-y-full ${
          expanded ? "block" : "hidden"
        }`}
      >
        {sortOptions.map((option, idx) => (
          <SortingOption option={option} key={idx} setExpanded={setExpanded} />
        ))}
      </div>
    </div>
  );
};

export default SortingSelector;
