import React from "react";
import { RangeSlider } from "../Slider";

const MapSlider = ({
  low,
  high,
  setLow,
  setHigh,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: any) => {
  return (
    <div className="w-full flex flex-col gap-10 px-6 mt-6">
      <h1 className="text-xl font-bold text-center">Filter flights</h1>

      <RangeSlider
        min={0}
        max={365}
        step={1}
        options={{
          track: {
            height: "7px",
          },
          range: {
            background: "#28282B",
          },
          thumb: {
            width: "16px",
            height: "16px",
          },
          leftInputProps: {
            value: low,
            onChange: (e) => setLow(Number(e.target.value)),
          },
          rightInputProps: {
            value: high,
            onChange: (e) => setHigh(Number(e.target.value)),
          },
        }}
        displayValues={{
          fromDate,
          setFromDate,
          toDate,
          setToDate,
        }}
      />
    </div>
  );
};

export default MapSlider;
