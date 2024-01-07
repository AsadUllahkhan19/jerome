import Image from "next/image";
import React, { useState } from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import MapSlider from "./MapSlider";
import { MdCancel } from "react-icons/md";

const SideBar = ({
  deaprtureAiport,
  destinationAiport,
  fromDate,
  setFromDate,
  toDate,
  setIsModalOpen,
  setToDate,
  setDestinationAiport,
  setAirportMarker,
  setModalType,
  setFinalRoute,
  setCompleteRoute,
  setToggleMap,
  setShowRouteLayer,
  setDestinationAiportIATA,
  setDeaprtureAiport,
}: any) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(365);
  return (
    <div className="h-full   w-80 xl:w-1/5 right-0 absolute flex flex-col gap-2 items-center top-0 z-20 bg-white ">
      <div
        className="flex  gap-3 mt-4 ml-auto mr-5 border border-indigo-60 p-3 cursor-pointer"
        onClick={() => {
          window.location.reload();
        }}
      >
        <Image alt="Reset" src="/logout.png" height={20} width={20} />
        Reset
      </div>
      <div className="mt-7 bg-white">
        <Image src="./logo.svg" alt="dsf" height={200} width={200} />
      </div>
      <div className="w-full mt-4">
        <hr />
      </div>
      <div className="flex mt-7 w-full items-center flex-col gap-4 bg-primary py-10 px-4 ">
        <div className="w-full flex border-black border bg-white">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setModalType("Departure");
            }}
            className="  h-fit  py-2 px-3 w-full flex gap-6 items-center "
          >
            <FaPlaneDeparture size={20} />
            <p className="text-lg ">
              {deaprtureAiport ? deaprtureAiport : "Departure Airport"}
            </p>
          </button>
          <button
            onClick={() => {
              setDeaprtureAiport(null);
              setAirportMarker([]);
              setCompleteRoute([]);
              setFinalRoute([]);
              setDestinationAiport(null);
              setDestinationAiportIATA(null);
              setToggleMap(true);
              setTimeout(() => {
                setToggleMap(false);
              },0)
            }}
            className="px-3"
          >
            <MdCancel size={20} />
          </button>
        </div>
        <div className="w-full flex border-black border bg-white">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setModalType("Destination");
            }}
            className="  h-fit  py-2 px-3 w-full flex gap-6 items-center "
          >
            <FaPlaneArrival size={20} />
            <p className="text-lg ">
              {destinationAiport ? destinationAiport : "Destination Airport"}
            </p>
          </button>
          <button
            onClick={() => {
              setDestinationAiport(null);
              setFinalRoute([]);
              // setAirportMarker([]);
              setToggleMap(true);
              setShowRouteLayer(1)
              setTimeout(() => {
                setToggleMap(false);
              },0)
            }}
            className="px-3"
          >
            <MdCancel size={20} />
          </button>
        </div>

        <button className="bg-buttonColor hover:bg-hoverButtonColor hover:bg-HoverButtonColor mt-6  h-fit pt-2 pb-2 pl-3 w-64 mx-auto flex gap-6 items-center ">
          <p className="text-base text-center mx-auto">Search flights</p>
        </button>
        <p className="text-base text-center mx-auto">Vogue Sachin Six</p>
      </div>
      <MapSlider
        low={low}
        high={high}
        setLow={setLow}
        setHigh={setHigh}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
    </div>
  );
};

export default SideBar;
