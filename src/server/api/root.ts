import { postRouter } from "~/server/api/routers/post";
import { deviceRouter } from "./routers/device";
import { createTRPCRouter } from "~/server/api/trpc";
import { officeRouter } from "./routers/office";
import { reservationRouter } from "./routers/reservation";
import { AWSRouter } from "~/server/api/routers/aws";
import { sensorRouter } from "~/server/api/routers/sensor";
import { apisRouter } from "./routers/apis";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  office: officeRouter,
  reservation: reservationRouter,
  device: deviceRouter,
  aws: AWSRouter,
  sensor: sensorRouter,
  api: apisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
