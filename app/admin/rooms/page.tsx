import "./globals.css";
import React from "react";
import prisma from "@/app/prisma";
import { Rooms } from "@prisma/client/edge";

export default async function RoomPage() {
  function roomSubject(room: {
    id?: number;
    name?: string;
    subject?: string | null;
    addedAt?: Date;
  }) {
    if (room.subject === null) return "No Subject Assigned";
    else return room.subject;
  }

  const classrooms = await prisma.rooms.findMany();
  return (
    <div className="flex flex-col">
      <div id="rooms">
        <h1 className="text-xl font-bold" id="room-title">
          Current Rooms
        </h1>
      </div>
      <div id="room-list">
        <table style={{ width: "100%" }}>
          <tbody>
            <tr key="row-headers">
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Added At</th>
            </tr>
            {classrooms.map((room) => (
              <tr key={`row-${room.id}`}>
                <th>{room.id}</th>
                <th>{room.name}</th>
                <th>{roomSubject(room)}</th>
                <th>{room.addedAt.toString()}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
