import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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
        }),

    getHorarios: protectedProcedure
        .input(z.object({officeId:z.string()}))
        .query(async ({ctx, input}) => {
            
            const reserved = await ctx.db.reservation.findMany({
                where: {
                    officeId: input.officeId
                }
            
            })
            
            const generateHoursArray = () => {
                const hoursArray = [];
                
                for (let hour = 7; hour <= 20; hour++) {
                  // Format the hour as "hh:00 am/pm"
                  const formattedHour = (hour % 12 || 12) + ':00 ' + (hour < 12 ? 'am' : 'pm');
                  
                  hoursArray.push(formattedHour);
                }
                
                return hoursArray;
            }

            // Example usage:
            const hours = generateHoursArray();
            const reservations = [];
            for (const hour of hours) {
                // console.log(hour)
                let found = false;
                let email = "";
                if (reserved.some((e) => e.time === hour)) {
                    found = true;
                    
                    const id = reserved.find((e) => e.time === hour)?.userId;
                    const user = await ctx.db.user.findUnique({
                        where: {
                            id: id
                        },
                        select: {
                            email: true
                        }
                    })
                    console.log(user?.email)
                    console.log(hour)
                    email = user?.email ?? "";
                }
                const reservation = {hour: hour, reserved: found, email: email};
                reservations.push(reservation);
            }
        
            return reservations;
        })


  
    
    
    
        
})