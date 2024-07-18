var fs = require("fs");
import { PrismaClient } from "@prisma/client";

export { deviceCreate, roomCreate, teacherCreate };

async function deviceCreate(csvContent: Array<string>, database: PrismaClient) {
  try {
    csvContent.forEach(async (device: string) => {
      let rID: number | null;
      let tID: number | null;

      const [name, room, teacher] = device.split(",");

      // Check if the room exists
      const r = await database.rooms.findFirst({
        where: {
          name: { contains: room },
        },
      });
      if (r) {
        console.log(`Room ${r} found.`);
        rID = r.id;
      } else {
        rID = null;
      }

      // Check if the teacher exists
      const t = await database.teacher.findFirst({
        where: {
          name: { contains: teacher },
        },
      });
      if (t) {
        console.log(`Teacher ${t} found.`);
        tID = t.id;
      } else {
        tID = null;
      }

      const d = await database.device.create({
        data: {
          name: name,
          roomId: rID,
          teacherId: tID,
        },
      });
      console.log(`Device ${d} created.`);
    });
  } catch {
    throw new Error("Something went wrong trying to parse the CSV");
  }
}

async function teacherCreate(
  csvContent: Array<string>,
  database: PrismaClient
) {
  try {
    csvContent.forEach(async (room: string) => {
      const [name, subject] = room.split(",");

      if (subject.length > 1) {
        const r = await database.rooms.create({
          data: {
            name: name,
            subject: subject,
          },
        });
      }
    });
  } catch {
    throw new Error("Something went wrong trying to parse the CSV");
  }
}

async function roomCreate(csvContent: Array<string>, database: PrismaClient) {
  try {
    csvContent.forEach(async (room: string) => {
      let rID: number | null;
      let tID: number | null;

      const [name, subject] = room.split(",");

      if (subject.length > 1) {
        const r = await database.rooms.create({
          data: {
            name: name,
            subject: subject,
          },
        });
      }
    });
  } catch {
    throw new Error("Something went wrong trying to parse the CSV");
  }
}
