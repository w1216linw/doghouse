import { selectedZipCodesState } from "@/atoms/searchParamsState";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { AiOutlinePlusCircle } from "react-icons/ai";
const ZipCodeSelector = () => {
  const [zipCodes, setZipCodes] = useRecoilState(selectedZipCodesState);
  const [zipCode, setZipCode] = useState("");
  const onAdd = () => {
    const onlyNumber = /^\d+$/;
    if (!onlyNumber.test(zipCode)) {
      return;
    } else {
      setZipCodes([...zipCodes, zipCode]);
      setZipCode("");
    }
  };
  return (
    <div className="w-48">
      <div className="input-wrapper flex">
        <div>
          <label htmlFor="zid-code" className="label">
            Zip Code
          </label>
          <input
            type="text"
            id="zip-code"
            className="input"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button onClick={onAdd} className="w-10 text-2xl text-blue-300">
          <AiOutlinePlusCircle />
        </button>
      </div>
    </div>
  );
};

export default ZipCodeSelector;
