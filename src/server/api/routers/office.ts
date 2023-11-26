import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const officeRouter = createTRPCRouter({
  addOffice: protectedProcedure
    .input(z.object({ officeNum: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.office.create({
        data: {
          officeNum: input.officeNum,
        },
      });
    }),

  getOffices: protectedProcedure.query(async ({ ctx }) => {
    const offices = await ctx.db.office.findMany({
      orderBy: {
        officeNum: "asc",
      },
    });

    const final = [];
    for (const office of offices) {
      const temp = await ctx.db.temperature.findFirst({
        orderBy: {
          timeStamp: "desc",
        },
        where: {
          officeId: office.id,
        },
      });

      const light = await ctx.db.light.findFirst({
        orderBy: {
          timeStamp: "desc",
        },
        where: {
          officeId: office.id,
        },
      });
      if (temp && light)
        final.push({
          office: office,
          temp: temp.value,
          light: light.value,
          time: temp.timeStamp,
        });
      else{
        const min = 18;
        const max = 30;
        const min2 = 650;
        const max2 = 1024;
        const tempR = Math.floor(Math.random() * (max - min + 1)) + min;

        const lR = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        final.push({ office: office, temp:tempR , light: lR, time: "0:00" });
      } 
    }

    return final;
  }),
});
