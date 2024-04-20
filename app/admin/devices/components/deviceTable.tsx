import prisma from "@/app/prisma";
import { Device } from "@prisma/client/edge";

import "../globals.css"

async function GetDevices() {
  const devices = await prisma.device.findMany();
  if (devices.length > 1) {
    return (
      {devices.map((device: Device) => (
          <tr>
            <th>{device.id}</th>
            <th>{device.name}</th>
            <th>{device.room}</th>
            <th>{device.teacher}</th>
            <th>{device.addedAt.toString()}</th>
          </tr>
        ))})
  } else {
    return null;
  }
}

export { GetDevices };
