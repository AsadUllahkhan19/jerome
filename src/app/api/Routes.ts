import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema;

// Define a sub-schema for x_legs
const xLegSchema: any = new Schema({
  ORIGIN: String,
  DEST: String,
  Carrier: String
});

// Define the main schema
const mainSchema: any = new Schema({
  Sais: String,
  Jahr: String,
  Carrier: String,
  Ab: String,
  An: String,
  Zubr_Carrier: String,
  Zubr_Ab: String,
  Zubr_An: String,
  Zubr_Via: String,
  Haupt_Carrier: String,
  Haupt_Ab: String,
  Haupt_An: String,
  Haupt_Via: String,
  Abbr_Carrier: String,
  Abbr_Ab: String,
  Abbr_An: String,
  Abbr_Via: String,
  VT: String,
  ExAusland: String,
  Landkrzl: String,
  Ketten_Beginn: String,
  Ketten_Ende: String,
  id: Number,
  x_leg_0: xLegSchema,
  x_leg_1: xLegSchema,
  x_leg_2: xLegSchema,
  x_ORIGIN: String,
  x_DEST: String,
  x_nLeg: Number,
  x_legs: [xLegSchema]
});

const flightschema: any = mongoose.models.flightschemas || mongoose.model('flightschemas', mainSchema);

export default flightschema;