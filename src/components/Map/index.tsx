"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { MapStyles } from "./MapStyles";
import useSWR from "swr";
import { MdCancel } from "react-icons/md";
import { AirportModel } from "@/types";
import Image from "next/image";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer, ArcLayer } from "deck.gl";
import ZoomControl from "./ZoomControl";
import SideBar from "./SideBar";
import LoadingScreen from "../LoadingScreen";
import { AllAirportFetcher } from "./Fetchers";
import Modal from "../Modal";
import { LineLayer } from '@deck.gl/layers';
import Dummy from '../../../data/dummy.json'
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Hourglass } from 'react-loader-spinner';
import { grayMarker, yellowMarker } from "../Marker";

const data: any = Dummy

const layers: any = [
  new LineLayer({ id: 'line-layer', data })
];

const INITIAL_VIEW_STATE: any = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};


const Map = () => {
  let deckOverlay: any = null;
  const [zoom, setZoom] = useState(3);
  const [fromDate, setFromDate] = useState("");
  const [modalType, setModalType] = useState("");
  const [center, setCenter] = useState({ lat: 25.276987, lng: 55.296249 });
  const [completeRoute, setCompleteRoute] = useState<any>({});
  const [finalRoute, setFinalRoute] = useState<any>([{}]);
  const [toDate, setToDate] = useState("");
  const [map, setMap] = useState<any>(null);
  const [selectedAirport, setSelectedAirport] = useState<AirportModel | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deaprtureAiport, setDeaprtureAiport] = useState<String | null>(null);
  const [destinationAiport, setDestinationAiport] = useState<String | null | any>(
    null
  );
  const [deaprtureAiportIATA, setDeaprtureAiportIATA] = useState<String | null>(
    null
  );
  const [fetchLogo, setFetchLogo] = useState<any>(false)
  const [viewport, setViewport] = useState<any>({
    height: "100%",
    width: "100%"
  });
  const [destinationAiportIATA, setDestinationAiportIATA] =
    useState<String | null>(null);
  const [markerPosition, setMarkerPosition] = useState<any>();
  const [directAirports, setAirportMarker] = useState<any>([]);
  const [airportLegs, setAirportLegs] = useState<any>([]);
  const { data, error, isLoading } = useSWR(
    "/api/FetchAllAirports",
    AllAirportFetcher
  );
  const [showRouteLayer, setShowRouteLayer] = useState<any>(0);
  const [toggleMap, setToggleMap] = useState<boolean>(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBmlfCX9N5NAKdGidMbSxMXkc4CNHcT6rQ",
    language: "en",
  });
  // const []
  const mapContainerStyle = {
    width: "100%",
    height: "100dvh",
  };
  const fitBounds = () => {
    if (map && markerPosition) {
      // Use requestAnimationFrame for smooth animation
      const start = performance.now();
      const duration = 100; // Animation duration in milliseconds

      const animate = (timestamp: any) => {
        const progress = (timestamp - start) / duration;
        console.log(progress, "prog");
        if (progress < 1) {
          const newLat =
            center.lat + (markerPosition.lat - center.lat) * progress;
          const newLng =
            center.lng + (markerPosition.lng - center.lng) * progress;
          map.panTo({ lat: newLat, lng: newLng });
          requestAnimationFrame(animate);
        } else {
          map.panTo(markerPosition);
        }
      };

      requestAnimationFrame(animate);
    }
  };
  useEffect(() => {
    fitBounds();
  }, [center, map, markerPosition]);
  const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    minZoom: 3,
  };
  if (loadError) return "Error Loading Maps";
  if (!isLoaded || isLoading) return <LoadingScreen />;
  const handleMarkerClick = (airport: AirportModel) => {
    setMarkerPosition({
      lat: parseFloat(airport.LAT),
      lng: parseFloat(airport.LONG),
    });
    fitBounds();
    console.log('mmmmmm', airport)
    setTimeout(() => {
      setSelectedAirport(airport);
    }, 300);
  };

  // const dataGeo: any = Dummy;


  // useEffect(() => {
  //   setData(() => data);
  // }, [directAirports]);
  const onLoad = (mapInstance: any) => {
    setMap(mapInstance);
    var projection = mapInstance.getProjection();
    console.log(showRouteLayer,'heeeking', finalRoute)
    if (showRouteLayer === 1) {
      const newdeckOverlay = new GoogleMapsOverlay({
        layers: [
          new ArcLayer({
            id: "arcs",
            data: directAirports,
            greatCircle: true,
            // @ts-ignore
            getSourcePosition: d => d.source,
            // @ts-ignore
            getTargetPosition: d => d.target, // London

            // getTargetPosition: (f) => [f?.destLONG, f?.destLat],
            getSourceColor: (d) => {
              return [255, 162, 0, 120];
            },
            getTargetColor: () => [0, 255, 0, 120],
            getWidth: d => 3
          }),
        ],
      });
      // console.log('deckOverlay_DEparture', newdeckOverlay)
      newdeckOverlay.setMap(mapInstance);

    } else if (showRouteLayer === 2) {
      const newdeckOverlay = new GoogleMapsOverlay({
        layers: [
          new ArcLayer({
            id: "arcs",
            data: finalRoute,
            greatCircle: true,
            // @ts-ignore
            getSourcePosition: d => d.source,
            // @ts-ignore
            getTargetPosition: d => d.target, // London

            // getTargetPosition: (f) => [f?.destLONG, f?.destLat],
            getSourceColor: (d) => {
              return [255, 162, 0, 120];
            },
            getTargetColor: () => [0, 255, 0, 120],
            getWidth: d => 3
          }),
        ],
      });
      // console.log('deckOverlay_DEparture', newdeckOverlay)
      newdeckOverlay.setMap(mapInstance);
    }
  };

  // =============================== DECK GL STARTS ==========================

  // for(let i= 0; i< dat1a?.data?.length; i++){
  // console.log('lkasdlkad', dat1a.data[i])

  //   const deckOverlay = new GoogleMapsOverlay({
  //     layers: [
  //       new ArcLayer({
  //         id: "arcs",
  //         data: newDtass,
  //         //  [{
  //         //   Carrier: "HM",
  //         //   DEST: "SEZ",
  //         //   ORIGIN: "BOM",
  //         //   source: [72.8679, 19.0887],
  //         //   target: [-4.671275, 55.51128]
  //         // }],
  //         greatCircle: true,
  //         // @ts-ignore
  //         getSourcePosition: d => d.source,
  //         // @ts-ignore
  //         getTargetPosition: d => d.target, // London

  //         // getTargetPosition: (f) => [f?.destLONG, f?.destLat],
  //         getSourceColor: (d) => {
  //           return [255, 162, 0, 120];
  //         },
  //         getTargetColor: () => [0, 255, 0, 120],
  //         getWidth: d => 3
  //       }),
  //     ],
  //   });



  // // } 
  // deckOverlay.setProps({})    

  // =========================================  DECK GL ENDS =========================================




  const handleDepartureClick = (selectedAirport: any) => {

    selectedAirport.AIRPORT_NAME == destinationAiport &&
      setDestinationAiport(null);

    setDeaprtureAiport(selectedAirport.AIRPORT_NAME);
    setDeaprtureAiportIATA(selectedAirport.AIRPORT_IATA);
    setShowRouteLayer(1)
    setToggleMap(true);
    // setFinalRoute([]);
    fetch(`/api/GetDestAiports?slug=${selectedAirport.AIRPORT_IATA}`)
      .then((res1: any) => res1.json())
      .then((dat1a) => {
        // setAirportMarker(dat1a.data);
        setAirportMarker(dat1a.data);
        // if (data?.data?.length > 0) {
        // console.log('cnsdjfnsjdfnsk', dat1a.data);

        // =============================== ==========================


        // deckOverlay = new GoogleMapsOverlay({
        //   layers: [
        //     new ArcLayer({
        //       id: "arcs",
        //       data: dat1a.data,
        //       greatCircle: true,
        //       // @ts-ignore
        //       getSourcePosition: d => d.source,
        //       // @ts-ignore
        //       getTargetPosition: d => d.target, // London

        //       // getTargetPosition: (f) => [f?.destLONG, f?.destLat],
        //       getSourceColor: (d) => {
        //         return [255, 162, 0, 120];
        //       },
        //       getTargetColor: () => [0, 255, 0, 120],
        //       getWidth: d => 3
        //     }),
        //   ],
        // });

        setToggleMap(false);

        // } 
        // console.log('deckOverlay_DEparture', deckOverlay)
        // deckOverlay.setMap(map);



        // =========================================

        // let polyline: any; 
        // dat1a?.data?.map((item: any) => {
        //    polyline = new google.maps.Polyline({
        //     path: [
        //       new google.maps.LatLng(item.originLAT, item?.originLONG), // Kyiv
        //       new google.maps.LatLng(item?.destLAT, item?.destLONG), // Kharkiv
        //       // new google.maps.LatLng(47.097133, 37.543367) // Mariupol
        //     ],
        //     strokeColor: "#FF0000",
        //     strokeOpacity: 1.0,
        //     strokeWeight: 2
        //   });
        //   polyline.setMap(map);
        // })

        // }

      })
  };
  const handleDestinationClick = (selectedAirport: any) => {


    setToggleMap(true)
    // deckOverlay.setMap(null);
    selectedAirport.AIRPORT_NAME == deaprtureAiport && setDeaprtureAiport(null);
    setDestinationAiport(selectedAirport.AIRPORT_NAME);
    setDestinationAiportIATA(selectedAirport.AIRPORT_IATA);
    // console.log(selectedAirport,'humayun', directAirports)
    console.log('asaddf', selectedAirport, selectedAirport?.fromModal)
    if(selectedAirport?.fromModal){

      const temp1:any = data?.data?.find((airport: any) => {
        if (deaprtureAiportIATA === airport?.AIRPORT_IATA ) {
          return airport
        }
      })
      const temp2:any = data?.data?.find((airport: any) => {
        if (destinationAiportIATA === airport?.AIRPORT_IATA) {
          return airport
        }
      })

      let source = [parseFloat(temp1?.LONG), parseFloat(temp1?.LAT)]; 
      let target = [parseFloat(temp2?.LONG), parseFloat(temp2?.LAT)];
      let obj: any = {}
      obj.source = source
      obj.target = target;
      let array: any  = [];
      array.push(obj)
      setFinalRoute(array);
    } else{
      const handleDest: any = directAirports.filter((item: any) => item?.id == completeRoute?.id && item?.indexNum <= completeRoute?.indexNum);
      
      setFinalRoute(handleDest);
    }

    setShowRouteLayer(2)
    // console.log(completeRoute, 'user_data', handleDest);
    // if(deckOverlay !== null){

    // }
    // =============================== ==========================

    // for(let i= 0; i< dat1a?.data?.length; i++){
    // console.log('lkasdlkad', dat1a.data[i])




    // } 
    // @ts-ignore
    const just: any = setTimeout(() => {
      setToggleMap(false)
      // deckOverlay = new GoogleMapsOverlay({
      //   layers: [
      //     new ArcLayer({
      //       id: "arcs",
      //       data: data,

      //       greatCircle: true,
      //       // @ts-ignore
      //       getSourcePosition: d => d.source,
      //       // @ts-ignore
      //       getTargetPosition: d => d.target, // London

      //       // getTargetPosition: (f) => [f?.destLONG, f?.destLat],
      //       getSourceColor: (d) => {
      //         return [255, 162, 0, 120];
      //       },
      //       getTargetColor: () => [0, 255, 0, 120],
      //       getWidth: d => 3
      //     }),
      //   ],
      // });
      // deckOverlay.setMap(map);

    }, 1000)
    // const { layers } = deckOverlay.props;
    // const temp24: any = layers?.filter((layer: any) => layer.id !== "arcs")
    // console.log('deckOverlay_DEstination', temp24);




    // =========================================



    return

    if (deaprtureAiport !== null) {
      fetch(
        `/api/GetRoutesBetweenAirports?slug2=${selectedAirport.AIRPORT_IATA}&slug1=${deaprtureAiportIATA}`
      ).then(async (res1: any) => {
        const data = await res1.json();
        // console.log('putter', data.data)
        setAirportLegs(data.data);
        const polyline = new google.maps.Polyline({
          path: [
            new google.maps.LatLng(parseFloat(data.data[0]?.originLat), parseFloat(data.data[0]?.originLong)), // Kyiv
            new google.maps.LatLng(parseFloat(data.data[0]?.destLat), parseFloat(data.data[0]?.destLong)), // Kharkiv
            // new google.maps.LatLng(47.097133, 37.543367) // Mariupol
          ],
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        polyline.setMap(map);

      })
    } else {
      fetch(`/api/GetOriginAiports?slug=${selectedAirport.AIRPORT_IATA}`).then(
        async (res1: any) => {
          const data = await res1.json();
          setAirportMarker(data.data);
        }
      );
    }
  };

  if (toggleMap) {
    return <LoadingScreen />;
  }



  return (
    <div className="w-screen mx-auto  h-screen relative">
      {fetchLogo && (
        <div className="w-screen mx-auto  h-screen flex justify-center items-center absolute z-20 bg-indigo-600 bg-opacity-25">
          <Hourglass
            // @ts-ignore
            className="mx-auto"
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </div>
      )}

      <SideBar
        setAirportMarker={setAirportMarker}
        setDeaprtureAiport={setDeaprtureAiport}
        setDestinationAiport={setDestinationAiport}
        fromDate={fromDate}
        setModalType={setModalType}
        setIsModalOpen={setIsModalOpen}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        deaprtureAiport={deaprtureAiport}
        destinationAiport={destinationAiport}
        setFinalRoute={setFinalRoute}
        setToggleMap={setToggleMap}
        setCompleteRoute={setCompleteRoute}
        setShowRouteLayer={setShowRouteLayer}
        setDestinationAiportIATA={setDestinationAiportIATA}
        // @ts-ignore
        setDeaprtureAiport={setDeaprtureAiport}
      />
      <ZoomControl setZoom={setZoom} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
        options={options}
        onLoad={onLoad}
        ref={map}
      >

        {directAirports?.length > 0 &&
          (destinationAiport == null) &&
          directAirports &&
          directAirports?.length > 0 &&

          directAirports.map((airport: any, ind: number) => {


            return (
              <Marker
                key={ind}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(yellowMarker)}`
                }}
                onClick={() => {
                  setCompleteRoute(airport);
                  handleMarkerClick(airport);
                }}
                position={{
                  lat: parseFloat(airport?.LAT),
                  lng: parseFloat(airport?.LONG),
                }}
              />
            );
          })}
        
          
        {deaprtureAiport !== null &&
          data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((airport: AirportModel, ind: number) => {
            
            if (deaprtureAiportIATA === airport?.AIRPORT_IATA) {
              return (
                <Marker
                  key={ind}
                  onClick={() => {
                    handleMarkerClick(airport);
                  }}
                  position={{
                    lat: parseFloat(airport.LAT),
                    lng: parseFloat(airport.LONG),
                  }}
                />
              );
            }

          })}
        {destinationAiport !== null &&
          data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((airport: AirportModel, ind: number) => {
            
            if (destinationAiportIATA === airport?.AIRPORT_IATA) {
              return (
                <Marker
                  key={ind}
                  onClick={() => {
                    handleMarkerClick(airport);
                  }}
                  position={{
                    lat: parseFloat(airport.LAT),
                    lng: parseFloat(airport.LONG),
                  }}
                />
              );
            }

          })}
        {directAirports?.length <= 0 &&
          data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((airport: AirportModel, ind: number) => {
            // const isDirectAirport = directAirports.some(
            //   (e: any) => airport.AIRPORT_IATA === e.AIRPORT_IATA
            // );

            // const iconUrl = !isDirectAirport ? "/marker.png" : "/yellow.png";

            return (
              <Marker
                key={ind}

                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(grayMarker)}`,
                }}
                onClick={() => {
                  handleMarkerClick(airport);
                }}
                position={{
                  lat: parseFloat(airport.LAT),
                  lng: parseFloat(airport.LONG),
                }}
              />
            );
          })}
        {selectedAirport && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedAirport.LAT),
              lng: parseFloat(selectedAirport.LONG),
            }}
            onCloseClick={() => setSelectedAirport(null)}
          >
            <div className="h-32 gap-4 p-3 flex w-fit bg-white">
              <div className="h-full w-32 relative">
                <Image
                  layout="fill"
                  className="h-full w-2/4"
                  alt="Image"
                  src="/download.jpg"
                />
              </div>
              <div>
                <h3 className="text-lg text-black font-bold">
                  {selectedAirport.AIRPORT_NAME} ({selectedAirport.AIRPORT_IATA}
                  )
                </h3>
                <p className="text-base text-black font-light">
                  {selectedAirport.NAMEC[0] +
                    selectedAirport.NAMEC.slice(1).toLowerCase()}
                  , {selectedAirport.COUNTRY_NAME},
                </p>
                <p className="text-base text-black font-light">
                  {selectedAirport.REGION}
                </p>
              </div>
              <div className=" flex gap-3 items-end justify-start ">
                <button
                  disabled={deaprtureAiport === null ? false : true}
                  className={`${deaprtureAiport == selectedAirport.AIRPORT_NAME
                    ? "bg-primary"
                    : "bg-white"
                    } hover:bg-primary border-black border p-2`}
                  onClick={() => handleDepartureClick(selectedAirport)}
                >
                  <FaPlaneDeparture size={20} />
                </button>
                <button
                  disabled={destinationAiport === null ? false : true}
                  onClick={() => handleDestinationClick(selectedAirport)}
                  className={`${destinationAiport == selectedAirport.AIRPORT_NAME
                    ? "bg-primary"
                    : "bg-white"
                    } hover:bg-primary border-black border p-2`}
                >
                  <FaPlaneArrival size={20} />
                </button>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <Modal
        handleDestinationClick={handleDestinationClick}
        isModalOpen={isModalOpen}
        handleDepartureClick={handleDepartureClick}
        setIsModalOpen={setIsModalOpen}
        modalType={modalType}


        // =============================
        // @ts-ignore
        setAirportMarker={setAirportMarker}
        setDeaprtureAiport={setDeaprtureAiport}
        setDestinationAiport={setDestinationAiport}
        fromDate={fromDate}
        setModalType={setModalType}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        deaprtureAiport={deaprtureAiport}
        destinationAiport={destinationAiport}
        setFinalRoute={setFinalRoute}
        setToggleMap={setToggleMap}
        setCompleteRoute={setCompleteRoute}
        setShowRouteLayer={setShowRouteLayer}
        setDestinationAiportIATA={setDestinationAiportIATA}
        // setShowRouteLayer=
      />
    </div>
  );
};

export default Map;
