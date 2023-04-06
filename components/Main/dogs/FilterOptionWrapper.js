import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const FilterOptionWrapper = ({ option, children }) => {
  const [isShow, setIsShow] = useState(true);
  if (!children) return;
  if (children.length > 1 && children.every((elem) => elem === false)) return;
  return (
    <div className="border-b py-2">
      <div className="flex justify-between">
        <h3>{option}</h3>
        <button onClick={() => setIsShow(!isShow)}>
          {isShow ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
        </button>
      </div>
      <div className={`overflow-hidden ${isShow ? "h-auto" : "h-0"}`}>
        {children}
      </div>
    </div>
  );
};

export default FilterOptionWrapper;
