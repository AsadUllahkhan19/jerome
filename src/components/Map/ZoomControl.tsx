import React from "react";
import {
  FaMinus,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaPlus,
} from "react-icons/fa";
const ZoomControl = ({ setZoom }: any) => {
  return (
    <div className="absolute top-10 z-10 flex flex-col gap-4 right-80 pr-6">
      <button
        onClick={() => setZoom((prev:any) => prev + 1)}
        className="p-3 rounded-full hover:bg-hover  bg-secondary"
      >
        <FaPlus />
      </button>
      <button
        onClick={() => setZoom((prev:any) => (prev > 3 ? prev - 1 : prev))}
        className="p-3 rounded-full hover:bg-hover  bg-secondary"
      >
        <FaMinus />
      </button>
    </div>
  );
};

export default ZoomControl;
