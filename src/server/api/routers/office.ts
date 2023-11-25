import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const officeRouter = createTRPCRouter({
    addOffice: protectedProcedure
        .input(z.object({officeNum:z.number()}))
        .mutation(async({ ctx,input }) => {
            return ctx.db.office.create({
                data: {
                    officeNum: input.officeNum
                }
            })
        }),

    getOffices: protectedProcedure
        .query(async ({ctx}) => {
            return ctx.db.office.findMany()
        })
})