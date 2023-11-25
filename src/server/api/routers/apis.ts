// File to add procedures of general apis

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

import axios from "axios";
import { env } from "~/env";
import path from "path";

// import { MapLocation } from "~/zod/types";

// export interface MapLocation {
//   lat: number;
//   lng: number;
//   name: string;
// }

export const apisRouter = createTRPCRouter({
  sendPoints: publicProcedure
    .input(
      z.object({
        points: z.array(
          z.object({ lat: z.number(), lng: z.number(), name: z.string() }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.points.length < 2) {
        return "Ingrese un tamaño de ubicaciones válido. El tamaño tiene que ser mayor a uno.";
      }

      const endpoint = env.ROAD_DISTANCE_ENDPOINT + "/solution";

      const { data } = await axios.post(endpoint, {
        points: JSON.stringify(input.points),
      });
      
      console.log("Data recieved:", data);

      return "Finished";
    }),
});
