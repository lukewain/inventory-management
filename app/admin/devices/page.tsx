import "./globals.css";
import { GetDevices } from "./components/deviceTable";
import React from "react";
import prisma from "@/app/prisma";
import { Device } from "@prisma/client/edge";

export default async function Devices() {
  function deviceRoom(device: Device) {
    if (device.room === null) return "No Room Assigned";
    else return device.room;
  }

  function deviceTeacher(device: Device) {
    if (device.teacher === null) return "No Teacher Assigned";
    else return device.teacher;
  }

  function highlightTableRow(row) {
    const previouslySelectedRow = document.querySelector("tr.selected");
    if (previouslySelectedRow) {
      previouslySelectedRow.classList.remove("selected");
    }

    row.classList.add("selected");
  }

  const rows = document.querySelectorAll("table tr");
  for (let i = 1; i < rows.length; i++) {
    rows[i].onclick = function () {
      highlightTableRow(this);
    };
  }

  const devices = await prisma.device.findMany();
  return (
    <div className="flex flex-col">
      <div id="devices">
        <h1 className="text-xl font-bold" id="devices-title">
          Current Devices
        </h1>
      </div>
      <div id="device-list">
        <table style={{ width: "100%" }}>
          <tbody>
            <tr key="row-headers">
              <th>ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Teacher</th>
              <th>Added At</th>
            </tr>
            {devices.map((device: Device) => (
              <tr key={`row-${device.id}`}>
                <th>{device.id}</th>
                <th>{device.name}</th>
                <th>{deviceRoom(device)}</th>
                <th>{deviceTeacher(device)}</th>
                <th>{device.addedAt.toString()}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mx-auto mt-4 gap-14" id="option-buttons">
        <button className="btn btn-success">Add Item</button>
        <button className="btn btn-info">Modify Item</button>
        <button className="btn btn-error">Remove Item</button>
      </div>
    </div>
  );
}
