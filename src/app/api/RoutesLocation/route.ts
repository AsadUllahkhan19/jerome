
import { NextRequest, NextResponse } from "next/server";
// import Route from "../../../../data/route.json";
import Airports from '../../../../data/Location.json'
import AirportsInfo from '../../../../data/airports.json';
import mongoose from "mongoose";
import { mainDb } from "../../../../config/db";
import flightschema from "../Routes";

export async function GET(
  request: NextRequest, response: NextResponse
) {
  const slugInfo1: any = request.nextUrl.searchParams.get("slug1");
  await mongoose.connect(mainDb)
  // const slugInfo2: any = request.nextUrl.searchParams.get("slug2");
  // console.log('find');
   const data: any = await flightschema.find({ x_ORIGIN: slugInfo1 })

  return NextResponse.json({ status: 200, data: data}); 

  // let Dummy: any = Route;
  // let AirportData: any = Airports;
  // let AirportDataInfo: any = AirportsInfo;

  // const temp: any = Dummy.filter((item: any) => {
  //   if (item?.x_ORIGIN === slugInfo1 && item?.x_DEST === slugInfo2) {
  //     return item;
  //   }
  // })
  // Mujhe Lat / log Assign
  // const temp2: any = Dummy.map((item: any) => {
  //   if (AirportData?.some((ele: any) => item?.x_ORIGIN === ele?.IATA)) {
  //     const indivData: any = AirportData?.find((wes: any) => {
  //       if (wes?.IATA === item?.x_ORIGIN) {
  //         return item;
  //       }
  //     })
  //     const indivData2: any = AirportData?.find((wes: any) => {
  //       if (wes?.IATA === item?.x_DEST) {
  //         return item;
  //       }
  //     })

  //     const airportInfo: any = AirportDataInfo?.find((wes: any) => {
  //       if (wes?.AIRPORT_IATA === item?.x_DEST) {
  //         return item;
  //       }
  //     })
  //     const temp0 = item?.x_legs?.length > 0 && item?.x_legs?.map((ele: any) => {
  //       let temp1: any = []
  //       if (ele === null) {
          // console.log('here is null')

  //       } else {
  //         temp1 = AirportData.find((newE: any) => {

  //           return newE
  //         });
  //         // console.log('just_checking', temp1);
  //       }
  //       const temp2: any = AirportData.find((newE: any) => {
  //         if (newE?.IATA === ele?.DEST) {
  //           return newE
  //         }
  //       });

  //       let obj = ele;
  //       // console.log('cereree', temp1?.LAT);
  //       if (temp1?.LAT == '') {
  //         obj.originLat = temp1?.LAT;
  //         obj.originLong = temp1.LONG;
  //         obj.destLat = temp2?.LAT;
  //         obj.destLong = temp2?.LONG;

  //       }

  //       return obj;
  //     })



  //     let obj: any = {};
  //     obj = item;
  //     obj.OriginLat = indivData?.LAT
  //     obj.OriginLong = indivData?.LONG;
  //     obj.DestLat = indivData2?.LAT
  //     obj.DestLong = indivData2?.LONG;
  //     obj.REGION = airportInfo?.REGION;
  //     obj.AIRPORT_IATA = airportInfo?.AIRPORT_IATA;
  //     obj.NAMEC = airportInfo?.NAMEC;
  //     obj.AIRPORT_NAME = airportInfo?.AIRPORT_NAME;
  //     obj.COUNTRY_NAME = airportInfo?.COUNTRY_NAME;
  //     obj.x_legs = temp0;

  //     return obj;
  //   }
  // })
  // .map((newElement: any) => {
  //   return {
  //     LAT: newElement.DestLat,
  //     LONG: newElement.DestLong,
  //     AIRPORT_IATA: newElement.AIRPORT_IATA,
  //     REGION: newElement.REGION,
  //     NAMEC: newElement.NAMEC,
  //     AIRPORT_NAME: newElement.AIRPORT_NAME,
  //     COUNTRY_NAME: newElement.COUNTRY_NAME
  //   }
  // })

  // const datas1 = temp2.map((drairport: any) => {
  //   return drairport.x_legs;
  // })


  // return NextResponse.json({ status: 200, data: JSON.stringify(temp2) });
}
