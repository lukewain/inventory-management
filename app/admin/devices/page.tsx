import "./globals.css";
import React from "react";
import prisma from "@/app/prisma";
import { Device } from "@prisma/client/edge";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import ActionButtons from "./components/ActionButtons";

export default async function Devices() {
  function deviceRoom(device: Device) {
    if (device.room === null) return "No Room Assigned";
    else return device.room;
  }

  function deviceTeacher(device: Device) {
    if (device.teacher === null) return "No Teacher Assigned";
    else return device.teacher;
  }

  const devices = await prisma.device.findMany();
  return (
    <div className="flex flex-col">
      <div id="devices">
        <h1 className="text-xl font-bold" id="devices-title">
          Current Devices
        </h1>
      </div>
      <div className="w-[95%] mx-auto mt-14">
        <DataTable columns={columns} data={devices} />
      </div>
      <div id="action-buttons">
        <ActionButtons />
      </div>
    </div>
  );
}
