import { PrismaClient } from "@prisma/client";
import Table from "cli-table";

export { deviceFetch, teacherFetch, roomFetch };

async function deviceFetch(prisma: PrismaClient) {
  var table = new Table({
    head: ["ID", "Name", "Room ID", "Teacher ID."],
    colWidths: [30, 40, 40, 40],
  });
  const devices = await prisma.device.findMany({ take: 20 });

  devices.forEach((device) => {
    const rID = device.roomId ? device.roomId : "null";
    const tID = device.teacherId ? device.teacherId : "null";
    table.push([
      device.id.toString(),
      device.name.toString(),
      rID.toString(),
      tID.toString(),
    ]);
  });

  console.log(table.toString());
}

async function teacherFetch(prisma: PrismaClient) {
  var table = new Table({
    head: ["ID", "Name"],
    colWidths: [30, 80],
  });
  const teachers = await prisma.teacher.findMany({ take: 20 });

  teachers.forEach((teacher) => {
    table.push([teacher.id.toString(), teacher.name.toString()]);
  });

  console.log(table.toString());
}

async function roomFetch(prisma: PrismaClient) {
  var table = new Table({
    head: ["ID", "Name"],
    colWidths: [30, 60],
  });
  const rooms = await prisma.rooms.findMany({ take: 20 });

  rooms.forEach((room) => {
    table.push([room.id.toString(), room.name.toString()]);
  });

  console.log(table.toString());
}
