import type { NextApiRequest, NextApiResponse } from "next";

import { deviceCaller } from "~/server/api/ApiCaller";

import { DeviceTypeModel } from "~/zod/types";

import { z } from "zod";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Debug
  // console.log("Device type triggerd: ");
  // console.log("body", req.body);
  // console.log("query", req.query);

  try {
    const { connectionId, original } = req.body;

    if (!connectionId) {
      res.status(400).json({
        message: "Error: Missing connection id",
      });
    }

    // Validate the original string
    const originalString = z.string().parse(original);

    // Transform string into JSON format, to then obtain JSON object
    const keyValuePairs = originalString
      .replace(/[{}]/g, "")
      .split(", ")
      .map((pair) => pair.split("="));

    const dictObject: Record<string, string> = {};
    keyValuePairs.forEach((pair) => {
      if (
        typeof pair[0] === "string" &&
        typeof pair[1] === "string"
      ) {
        dictObject[pair[0]] = pair[1];
      }
    });

    // console.log("dictObject: ", dictObject);

    const deviceObject = DeviceTypeModel.parse(dictObject);

    const name = deviceObject.name;
    const type = deviceObject.type;

    // console.log("Original object: ", deviceObject);

    await deviceCaller.setDevice({
      connectionId,
      name,
      type,
    });

    res.status(200).json({
      message: "Device type set",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: "Error: " + JSON.stringify(error),
    });
  }
}
