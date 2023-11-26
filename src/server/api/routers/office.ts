import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const officeRouter = createTRPCRouter({
    addOffice: protectedProcedure
        .input(z.object({ officeNum: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.office.create({
                data: {
                    officeNum: input.officeNum
                }
            })
        }),

    getOffices: protectedProcedure
        .query(async ({ ctx }) => {
            const offices = await ctx.db.office.findMany({
                orderBy: {
                    officeNum: "asc"
                }
            })

            const final = []
            for (let office of offices) {
                const temp = await ctx.db.temperature.findFirst({

                    orderBy: {
                        timeStamp: "desc"
                    },
                    where: {
                        officeId: office.id
                    },


                })

                const light = await ctx.db.light.findFirst({

                    orderBy: {
                        timeStamp: "desc"
                    },
                    where: {
                        officeId: office.id
                    },


                })
                if (temp && light)
                    final.push({ office: office, temp: temp.value, light: light.value, time: temp.timeStamp })

                else
                    final.push({ office: office, temp: 0, light: 0, time: "0:00" })

            }

            return final;
        })
})