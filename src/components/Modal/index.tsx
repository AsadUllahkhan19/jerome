import { useState } from "react";
import { IoClose } from "react-icons/io5";
import useSWR from "swr";
import { AllAirportFetcher } from "../Map/Fetchers";

function Modal({
  isModalOpen,
  setIsModalOpen,
  handleDestinationClick,
  handleDepartureClick,
  modalType,

 
  deaprtureAiport,
  destinationAiport,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setDeaprtureAiport,
  setDestinationAiport,
  setAirportMarker,
  setModalType,
  setFinalRoute,
  setCompleteRoute,
  setToggleMap,
  setShowRouteLayer,
  setDestinationAiportIATA,

}: any) {
  const [currContinent, serCurrContinent] = useState<String | null>("Europe");

  const { data, error, isLoading } = useSWR(
    "/api/GetContinentCountriesData",
    AllAirportFetcher
  );
  const Continents = new Set(data?.data.map((e: any) => e.continent));
  return (
    <>
      {isModalOpen ? (
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="absolute flex justify-center  items-center z-20 top-0 left-0  w-screen h-screen"
        >
          <div className="overflow-x-auto mx-auto w-[90%] relative h-[90%] px-8 py-4 bg-white ">
            <button
              className="border-0 absolute right-4 text-2xl top-4"
              onClick={() => setIsModalOpen(false)}
            >
              <IoClose />
            </button>
            <div>
              <h1 className="text-3xl text-center py-2 font-bold">
                Please Select An Airport
              </h1>
              <p className="py-2 text-center text-xl">
                Please enter an airport in the search field or select a
                continent.
              </p>
              <div className="border flex mx-auto h-12 w-80 items-center  justify-center my-5 border-black">
                <p className="px-2">🔎</p>
                <input
                  className="px-2 outline-none focus:outline-none  h-full w-full"
                  placeholder="Find Any Airport"
                />
              </div>
            </div>
            <div className="flex justify-between px-4 my-4">
              {[...Continents]?.map((cont: any, index:number) => {
                return (
                  <h3
                  key={`newDtass${index}`}
                    onClick={() => serCurrContinent(cont)}
                    className={`cursor-pointer text-xl hover:underline underline-offset-4 font-bold my-3 ${
                      currContinent === cont ? "bg-buttonColor" : ""
                    }  px-4 py-2`}
                  >
                    {cont}
                  </h3>
                );
              })}
            </div>
            <div className="px-4">
              {data.data.map(
                (dum: any, index: number) =>
                  dum.continent == currContinent && (
                    <div className="">
                      key={`newDtassadhiasasdasddads${index}`}
                      <h2 className="text-2xl font-bold px-4">{dum.country}</h2>
                      <div className="flex flex-wrap justify-start">
                        {dum.airports.map((port: { name: string; code: string }, index: number) => {
                            return (
                              <button
                              key={`newDtassadhiasadmlas;dmlad;msds${index}`}
                                onClick={() => {
                                 if (modalType == "Departure"){
                                   handleDepartureClick({
                                       AIRPORT_NAME: port.name,
                                       AIRPORT_IATA: port.code,
                                     });
                                     
                                     
                                    //  setDeaprtureAiport(null);
                                    //  setAirportMarker([]);
                                    //  setCompleteRoute([]);
                                    //  setFinalRoute([]);
                                     setDestinationAiport(null);
                                     setDestinationAiportIATA(null)
                                     setToggleMap(true);
                                    //  setTimeout(() => {
                                    //    setToggleMap(false);
                                    //  },0)
                                    
                                    

                                 } else {
                                  
                                  setCompleteRoute({
                                    AIRPORT_NAME: port.name,
                                    AIRPORT_IATA: port.code,
                                    
                                  })
                                   handleDestinationClick({
                                       AIRPORT_NAME: port.name,
                                       AIRPORT_IATA: port.code,
                                       fromModal: true
                                     });

                                 }

                                  setIsModalOpen(false);
                                }}
                              >
                                <p className="w-64 hover:bg-gray-200 text-left cursor-pointer mt-2 py-2 text-lg ps-4">
                                  {port.name}
                                </p>
                              </button>
                            );
                          }
                        )}
                      </div>
                      <hr className="my-3" />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
