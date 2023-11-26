import { z } from "zod";

// Types for the API

export const DeviceTypeModel = z.object({
  name: z.string(),
  type: z.string(),
});

export const CommandObject = z.object({
  action: z.enum(["getTemperature", "getLight", "turnOnLight", "turnOffLight"]),
  data: z.string().optional(),
  id: z.string().optional(),
  open: z.number().optional(),
});

// Must match with nodeMCU
export const DeviceDataType = z.enum([
  "temperature",
  "RFID",
  "light",
  "movement",
]);

export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
}

export const PythonApi = z.object({
  solution_array: z.array(z.array(z.array(z.number()))),
  max_route_distance: z.number(),
  litros_total: z.number(),
  costo_total: z.number(),
});
