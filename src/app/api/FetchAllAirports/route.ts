import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import airportData from "airport-data-js";
import { AirportModel, ErrorResponse } from "@/types";

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), "data", "airports.json");
  try {
    let datas = fs.readFileSync(filePath, { encoding: "utf-8" });
    const rawData = JSON.parse(datas);
    const result = rawData
      .map((item: any) => {
        if (item?.LANG === "en") {
          return item;
        }
      })
      .filter((ele: any) => ele != null);
    return NextResponse.json({ status: 200, data: result });
  } catch (error) {
    console.error("Error reading the CSV file:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}
