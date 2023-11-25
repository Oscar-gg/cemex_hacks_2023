import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const deviceRouter = createTRPCRouter({
  addDevice: adminProcedure
    .input(
      z.object({
        connectionId: z.string(),
        domain: z.string(),
        stage: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.device.deleteMany({
          where: {
            OR: [{ connectionId: input.connectionId }],
          },
        });
        await ctx.db.device.create({
          data: {
            connectionId: input.connectionId,
            domain: input.domain,
            stage: input.stage,
          },
        });
        return true;
      } catch (error) {
        console.log("error: ", error);
      }

      return false;
    }),

  setDevice: adminProcedure
    .input(
      z.object({
        connectionId: z.string(),
        name: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Delete all devices with the same name, except the one with the same connectionId
        await ctx.db.device.deleteMany({
          where: {
            AND: [
              { name: input.name },
              { NOT: { connectionId: input.connectionId } },
            ],
          },
        });

        await ctx.db.device.update({
          where: {
            connectionId: input.connectionId,
          },
          data: {
            name: input.name,
            type: input.type,
          },
        });
        return true;
      } catch (error) {
        console.log("error: ", error);
      }

      return false;
    }),

  removeDevice: adminProcedure
    .input(z.object({ connectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await ctx.db.device.delete({
        where: {
          connectionId: input.connectionId,
        },
      });
    }),

  getDeviceInfo: publicProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.device.findFirst({
        where: {
          connectionId: input.connectionId,
        },
      });
    }),

  getDevices: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.device.findMany();
  }),

  getDeviceIds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.device.findMany({
      select: {
        connectionId: true,
      },
    });
  }),
});
