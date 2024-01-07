import { NextRequest, NextResponse } from "next/server";

import AirportsInfo from "../../../../data/airports.json";
import location from "../../../../data/Location.json";

export async function GET(request: NextRequest) {


  return NextResponse.json({ status: 200, data: 'empty' });
}
