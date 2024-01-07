import { NextRequest, NextResponse } from "next/server";
// import Route from "../../../../data/route.json";
import AirportsInfo from "../../../../data/airports.json";
import mongoose from "mongoose";
import { mainDb } from "../../../../config/db";
import flightschema from "../Routes";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  // let Dummy: any = Route;

  // const filteredRoutes = new Set(
  //   Dummy.filter((item: any) => item?.An === slug).map((item: any) => item.Ab)
  // );
  await mongoose.connect(mainDb)
  // const slugInfo2: any = request.nextUrl.searchParams.get("slug2");

  const data: any = await flightschema.find({ An: slug }).select('Ab');
  // console.log('bbbbb', data)
  const result: any = AirportsInfo.filter((airport: any) =>{
    if (data.some((itemss: any) => itemss.Ab === airport.AIRPORT_IATA)) {
    return airport;
  }
  });

  return NextResponse.json({ status: 200, data: result });
}
