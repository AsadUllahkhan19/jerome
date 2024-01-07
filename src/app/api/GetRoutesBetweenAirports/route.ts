import { NextRequest, NextResponse } from "next/server";
// import Route from '../../../../data/route.json';
import AirportsInfo from "../../../../data/airports.json";
import location from "../../../../data/Location.json";

export async function GET(request: NextRequest) {
  // let Dummy: any = Route;
  // let Location: any = location;
  // let filteredRoutes: any = new Set();
  // let result: any = [];
  // let AirportDataInfo: any = AirportsInfo;
  // const slug1 = request.nextUrl.searchParams.get("slug1");
  // const slug2 = request.nextUrl.searchParams.get("slug2");

  // const datas: any = Dummy.map(
  //   (item: any) =>
  //     item?.An === slug2 &&
  //     item?.Ab === slug1 &&
  //     filteredRoutes.add(item.x_legs)
  // );
  // // [...filteredRoutes].map((e: any, i: any) =>
  // //   AirportDataInfo.map((a: any) => a.AIRPORT_IATA == e && result.push(a))
  // // );
  // const data123: any = [];
  // const finalData: any = [...filteredRoutes].map((subArray: any) => subArray.filter((item: any) => item !== null));
  // for (let i = 0; i < finalData.length; i++) {

  //   const origin: any = Location.find((item: any) => item?.IATA === finalData[i][0]["ORIGIN"]);
  //   const dest: any = Location.find((item: any) => item?.IATA === finalData[i][0]["DEST"]);
  //   data123.push({ originLong: origin.LONG, originLat: origin.LAT, destLong: dest.LONG, destLat: dest.LAT, ORIGIN: finalData[i][0]["ORIGIN"], DEST: finalData[i][0]["DEST"] })
  // }

  return NextResponse.json({ status: 200, data: 'empty' });
}
