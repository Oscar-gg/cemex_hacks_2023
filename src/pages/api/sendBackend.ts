import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

type ResponseData = {
  message: string;
};

// Para hacer pruebas directas con postman

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { message, connectionId, stage, domain } = req.body;
  console.log(req.body);

  const callbackUrl = `https://${domain}/${stage}`;
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const requestParams = {
    ConnectionId: connectionId,
    Data: JSON.stringify({
      action: "message",
      content: message,
    }),
  };

  const command = new PostToConnectionCommand(requestParams);

  if (!message) {
    res.status(400).json({
      message: "No message provided",
    });
  }

  const result = await client.send(command);
  res.status(200).json({
    message: JSON.stringify(result),
  });
}
