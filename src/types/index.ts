// export interface AirportModel {
//   IATA_code: string;
//   airport: string;
//   city: string;
//   county: string;
//   city_code: string;
//   country_code: string;
//   latitude: number;
//   longitude: number;
//   time: string;
//   state: string;
// }

export interface AirportModel {
  AIRPORT_IATA: string;
  AIRPORT_NAME: string;
  COUNTRY_CODE: string;
  COUNTRY_ISO2: string;
  COUNTRY_ISO3: string;
  COUNTRY_NAME: string;
  LANG: string;
  LAT: string;
  LONG: string;
  NAMEC: string;
  REGION: string;
  REGION_CODE: number;
  SUB_REGION: string;
  SUB_REGION_CODE: number;
  XXX: string;
  YYY: string;
  "intermediate-region"?: string | null;
  "intermediate-region-code"?: number | null;
  "iso_3166-2": string;
}

export interface ErrorResponse {
  status: number;
  error: string;
}
