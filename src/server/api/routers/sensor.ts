import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const sensorRouter = createTRPCRouter({
  addLight: publicProcedure
    .input(z.object({ data: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.light.create({
        data: {
          value: input.data,
        },
      });
    }),
  addTemperature: publicProcedure
    .input(z.object({ data: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.temperature.create({
        data: {
          value: input.data,
        },
      });
    }),
  addRFID: publicProcedure
    .input(z.object({ data: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.rFID.upsert({
        where: {
          id: input.data,
        },
        update: {
          detections: {
            increment: 1,
          },
        },
        create: {
          id: input.data,
        },
      });
    }),
});
