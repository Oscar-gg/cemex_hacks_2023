import { connect } from "http2";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const reservationRouter = createTRPCRouter({

    addReservation: protectedProcedure
        .input(z.object({ time: z.string(), officeId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id ?? ""
            
            return await ctx.db.reservation.create({
                data: {
                    time: input.time,
                    user :{
                        connect: {
                            id: userId,
                        }
                    }, 
                    office: {
                        connect: {
                            id: input.officeId                    
                        }
                        }
                    }
                },

            )}),

    getReservations: protectedProcedure
        .input(z.object({officeId:z.string()}))
        .query(async ({ctx, input}) => {
            return (
                ctx.db.office.findUnique({
                    where: {
                        id: input.officeId
                    },
                    select: {
                        reservations: true
                    }
                })
            )
        })
        
})