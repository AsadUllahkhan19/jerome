import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import airportData from "airport-data-js";
import { AirportModel, ErrorResponse } from "@/types";
import AirportsInfo from "../../../../data/airports.json";
import ContinentInfo from "../../../../data/continent.json";

export async function GET(request: NextRequest) {
  let continentData: any = ContinentInfo;
  let aiportData: any = AirportsInfo;
  let result: any = [];
  const Continents = new Set(
    aiportData.map((item: any) =>
      item?.REGION == undefined ? "Asia" : item.REGION
    )
  );
  [...Continents].map((item: any) => {
    const CountrySet = new Set(
      aiportData.map((e: any) => e?.REGION === item && e.COUNTRY_NAME)
    );
    [...CountrySet].map((country) => {
      let airportArr: any = [];
      aiportData.map(
        (item: any) =>
          item?.COUNTRY_NAME == country &&
          item?.LANG == "en" &&
          airportArr.push({ name: item.AIRPORT_NAME, code: item.AIRPORT_IATA })
      );
      let modal = {
        continent: item,
        country: country,
        airports: airportArr,
      };
      result.push(modal);
    });
  });

  return NextResponse.json({ status: 200, data: result });
}
