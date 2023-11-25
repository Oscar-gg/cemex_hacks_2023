import type { NextApiRequest, NextApiResponse } from "next";

import { deviceCaller } from "~/server/api/ApiCaller";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Debug integration request
  // console.log("body", req.body);
  // console.log("headers: ", req.headers);
  // console.log("query", req.query);

  const { connectionId, domain, stage } = req.body;

  await deviceCaller.addDevice({
    connectionId,
    domain,
    stage,
  });

  res.status(200).json({
    message: JSON.stringify(req.body),
  });
}
