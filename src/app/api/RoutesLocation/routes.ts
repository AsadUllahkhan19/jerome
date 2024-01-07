
import { NextRequest, NextResponse } from "next/server";
import Route from "../../../../data/route.json";
import Airports from '../../../../data/Location.json'
import AirportsInfo from '../../../../data/airports.json'



export async function GET(
  request: NextRequest, response: NextResponse
) {
    return NextResponse.json({ status: 200, messgae: [] });
}