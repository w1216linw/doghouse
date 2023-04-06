import { selectedAgeState } from "@/atoms/searchParamsState";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const AgeSelector = () => {
  const [age, setAge] = useRecoilState(selectedAgeState);
  const [minMax, setMinMax] = useState([age.min, age.max]);
  const onChangeAge = (value) => {
    setMinMax(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAge({ min: minMax[0], max: minMax[1] });
    }, 500);

    return () => clearTimeout(timer);
  }, [minMax, setAge]);

  useEffect(() => {
    if (age.min !== minMax[0] || age.max !== minMax[1])
      setMinMax([age.min, age.max]);
  }, [age, setMinMax]);

  return (
    <div className="w-56">
      <div className="input-wrapper">
        <label htmlFor="age" className="label">
          Age
        </label>
        <div className="px-4 py-1">
          <Slider
            id="age"
            range
            allowCross={false}
            value={minMax}
            min={0}
            max={20}
            step={1}
            marks={{ 0: "0", 20: "20" }}
            onChange={onChangeAge}
          />
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
