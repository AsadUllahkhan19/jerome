import { NextRequest, NextResponse } from "next/server";
// import Route from "../../../../data/route.json";
import AirportsInfo from "../../../../data/airports.json";
// import AirportsInfo from "../../../../data/Location.json";
// @ts-ignore

import mongoose from "mongoose";
import { mainDb } from "../../../../config/db";
import flightschema from "../Routes";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  
  let AirportsInfo1: any = AirportsInfo;

  await mongoose.connect(mainDb)
  // const slugInfo2: any = request.nextUrl.searchParams.get("slug2");
 
   const data: any = await flightschema.find({ Ab: slug }).select('x_legs');

  // const filteredRoutes = new Set(
  //   Dummy.filter((item: any) => item?.Ab === slug).map((item: any) => item.x_legs)
  // );
  

  // const airportIataToNameMap = AirportsInfo1.reduce((acc: any, airport: any) => {
  //   acc[airport.AIRPORT_IATA] = airport.AIRPORT_NAME;
  //   return acc;
  // }, {});
  // console.log('check', filteredRoutes);
  const temp1: any = JSON.stringify(data);
  const temp2: any = JSON.parse(temp1);



  const result: any = temp2.map((item: any) => {
    // const id = uuidv4(); 
   
    return item.x_legs.map((element:any, index: number) => {
      if(element !== null ){
        const origin: any = AirportsInfo1.find((ele: any) => ele.AIRPORT_IATA === element.ORIGIN);
        const dest: any = AirportsInfo1.find((ele: any) => ele.AIRPORT_IATA === element.DEST);
        let obj: any = element;
        obj.id = item._id;
        obj.indexNum = index; 
        obj.source = [parseFloat(origin?.LONG), parseFloat(origin?.LAT)]; 
        obj.target = [parseFloat(dest?.LONG), parseFloat(dest?.LAT)];
        obj.LAT = parseFloat(dest?.LAT);
        obj.LONG = parseFloat(dest?.LONG); 
        obj.REGION = dest?.REGION;
        obj.NAMEC = dest?.NAMEC;
        obj.AIRPORT_IATA = dest?.AIRPORT_IATA;
        obj.AIRPORT_NAME = dest?.AIRPORT_NAME;
        obj.COUNTRY_NAME = dest?.COUNTRY_NAME;
        obj.COUNTRY_CODE = dest?.COUNTRY_CODE;
        obj.COUNTRY_ISO2 = dest?.COUNTRY_ISO2;
        obj.COUNTRY_ISO3 = dest?.COUNTRY_ISO3;
        
        return obj;
      }
    })
  });

  function flattenArray(arr: any) {
    return arr.reduce((acc: any, val: any) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
}

  return NextResponse.json({ status: 200, data: flattenArray(result) });
}
