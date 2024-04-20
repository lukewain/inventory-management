import "./globals.css";
import { getDevices } from "./components/deviceTable";
import React from "react";

export default async function Devices() {
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
          <getDevices />
        </table>
      </div>
    </div>
  );
}
