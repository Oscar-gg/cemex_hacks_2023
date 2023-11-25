import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { removeInactiveConnections } from "~/utils/aws";

export const AWSRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({ connectionId: z.string(), message: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const device = await ctx.db.device.findUnique({
        where: {
          connectionId: input.connectionId,
        },
      });

      if (!device) {
        return "Error: device not found";
      }

      const callbackUrl = `https://${device.domain}/${device.stage}`;

      const client = new ApiGatewayManagementApiClient({
        endpoint: callbackUrl,
        region: "us-east-1",
      });

      // Example input: JSON.parse('{"action": "hola"}')

      const jsonObject = JSON.parse(input.message);

      const requestParams = {
        ConnectionId: device.connectionId,
        Data: JSON.stringify(jsonObject),
      };

      const command = new PostToConnectionCommand(requestParams);

      const result = await client.send(command);
      // return "Test";
      return JSON.stringify(result);
    }),

  refreshDevices: adminProcedure.mutation(async ({ ctx }) => {
    await removeInactiveConnections({ db: ctx.db });
    return "Se ha actualizado la lista de dispositivos";
  }),
});
