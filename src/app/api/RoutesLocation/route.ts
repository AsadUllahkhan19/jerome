
import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import { mainDb } from "../../../../config/db";
import flightschema from "../Routes";

export async function GET(
  request: NextRequest, response: NextResponse
) {
  const slugInfo1: any = request.nextUrl.searchParams.get("slug1");
  await mongoose.connect(mainDb)
   const data: any = await flightschema.find({ x_ORIGIN: slugInfo1 })
  return NextResponse.json({ status: 200, data: data}); 

}
