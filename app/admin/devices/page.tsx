import "./globals.css";
import { GetDevices } from "./components/deviceTable";
import React from "react";
import prisma from "@/app/prisma";
import { Device } from "@prisma/client/edge";

export default async function Devices() {
  const devices = await prisma.device.findMany()
  return (
    <div className="flex flex-col">
      <div id="devices">
        <h1 className="text-xl font-bold" id="devices-title">
          Current Devices
        </h1>
      </div>
      <div id="device-list">
        <table style={{ width: "100%" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Room</th>
            <th>Teacher</th>
            <th>Added At</th>
          </tr>
          {devices.map((device: Device) => (
          <tr>
            <th>{device.id}</th>
            <th>{device.name}</th>
            <th>{device.room}</th>
            <th>{device.teacher}</th>
            <th>{device.addedAt.toString()}</th>
          </tr>
        ))}
        </table>
      </div>
    </div>
  );
}
