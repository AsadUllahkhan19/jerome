import { NextRequest, NextResponse } from "next/server";

import AirportsInfo from "../../../../data/airports.json";
import mongoose from "mongoose";
import { mainDb } from "../../../../config/db";
import flightschema from "../Routes";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  
  await mongoose.connect(mainDb)

  const data: any = await flightschema.find({ An: slug }).select('Ab');

  const result: any = AirportsInfo.filter((airport: any) =>{
    if (data.some((itemss: any) => itemss.Ab === airport.AIRPORT_IATA)) {
    return airport;
  }
  });

  return NextResponse.json({ status: 200, data: result });
}
