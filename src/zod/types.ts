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
]);
