import type { NextApiRequest, NextApiResponse } from "next";

import { sensorCaller } from "~/server/api/ApiCaller";

import { DeviceDataType } from "~/zod/types";
import { z } from "zod";

type ResponseData = {
  message: string;
};

// Endpoint to handle all data inputs from the sensors.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Debug
  // console.log("Device type triggerd: ");
  // console.log("body", req.body);
  // console.log("query", req.query);

  const { dataType, data, id } = req.body;
  try {
    const type = DeviceDataType.parse(dataType);

    if (type === "temperature") {
      const temperature = z.number().parse(data);
      await sensorCaller.addTemperature({
        data: temperature,
      });
    } else if (type === "light") {
      const lightDetection = z.number().parse(data);
      await sensorCaller.addLight({
        data: lightDetection,
      });
    } else if (type === "RFID") {
      const rfidDetection = z.string().parse(data);
      await sensorCaller.addRFID({
        data: rfidDetection,
      });
    } else if (type === "movement") {
      await sensorCaller.addMovement();
    } else {
      throw new Error("Unknown data type");
    }

    res.status(200).json({
      message: "Data recieved successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: "Error: " + JSON.stringify(error),
    });
  }
}
