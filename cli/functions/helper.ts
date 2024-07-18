import { PrismaClient } from "@prisma/client";
import { deviceCreate, roomCreate, teacherCreate } from "./create";

export function getFilename(arglist: { [key: string]: string }): string {
  let filename: string;
  if (arglist["name"]) {
    if (arglist["name"].endsWith(".csv")) {
      filename = arglist["name"];
    } else {
      console.log(`Importing data for "${arglist["name"]}"...`);
      filename = arglist["name"] + ".csv";
    }
  } else {
    filename = "import.csv";
  }

  return filename;
}

export const devices: Array<string> = ["Device", "Room", "Teacher"];
export const teachers: Array<string> = ["Name", "Subject"];
export const rooms: Array<string> = ["Name", "Subject"];

// Compact prisma functions
enum PrismaAction {
  Create,
  Find,
}

enum PrismaTable {
  Device,
  Room,
  Teacher,
}

export function PrismaMethod(
  prisma: PrismaClient,
  fileContent: Array<string> | undefined,
  action: PrismaAction,
  table: PrismaTable
): boolean {
  switch (action) {
    case PrismaAction.Create:
      if (!fileContent) {
        console.error("No CSV was passed.");
        return false;
      }
      switch (table) {
        case PrismaTable.Device:
          deviceCreate(fileContent, prisma);
          return true;
        case PrismaTable.Room:
          roomCreate(fileContent, prisma);
          return true;
        case PrismaTable.Teacher:
          teacherCreate(fileContent, prisma);
          return true;
      }
  }
}
