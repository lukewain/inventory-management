// Check if import.csv exists

const fs = require("fs");
const path = require("path");
import { PrismaClient } from '@prisma/client'

function returnArg(
  possibles: Array<string>,
  flags: { [key: string]: any }
): string | undefined {
  for (const key in flags) {
    console.log(`Current key: ${key}`);
    if (possibles.includes(key)) {
      if (/^[A-Z]$/.test(key)) {
        return `-${key}`;
      } else {
        return `--${key}`;
      }
    }
  }
  return undefined;
}

const getArgs = () =>
  process.argv.reduce((args, arg) => {
    // long arg
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // flags
    else if (arg[0] === "-") {
      const flags = arg.slice(1).split("");
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
    return args;
  }, {} as { [key: string]: any });

const args = getArgs();

// Variable and Type declarations
let filename: string;

console.log(args);

if (args["name"]) {
  if (args["name"].endsWith(".csv")) {
    filename = args["name"];
  } else {
    console.log(`Importing data for "${args["name"]}"...`);
    filename = args["name"] + ".csv";
  }
} else {
  filename = "import.csv";
}

// Async write function
async function deviceMain(csvPath: string, database: PrismaClient) {
  try {
    // Read CSV file
    console.log("Reading CSV file...");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    // Parse CSV data
    console.log("Parsing CSV data...");
    const devices: Array<string> = csvData.split("\n");
    console.log("Removing header line...");
    devices.shift(); // Remove header line
    devices.forEach(async (device: string) => {

      let rID: number | null;
      let tID: number | null;

      const [name, room, teacher] = device.split(",");

      // Check if the room exists
      const r = await database.rooms.findUnique({
        where: {
          name: room
        }
      })
      if (r) {
        console.log(`Room ${r} found.`);
        rID = r.id
      } else {
        rID = null        
      }

      // Check if the teacher exists
      const t = await database.teacher.findUnique({
        where: {
          name: teacher
        }
      })
      if (t) {
        console.log(`Teacher ${t} found.`);
        tID = t.id
      } else {
        tID = null
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

async function teacherMain(csvPath: string, database: PrismaClient) {
  try {
    // Read CSV file
    console.log("Reading CSV file...");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    // Parse CSV data
    console.log("Parsing CSV data...");
    const devices: Array<string> = csvData.split("\n");
    console.log("Removing header line...");
    devices.shift(); // Remove header line
    devices.forEach(async (room: string) => {

      let rID: number | null;
      let tID: number | null;

      const [name, subject] = room.split(",");

      if (subject.length > 1) {
        const r = await database.rooms.create({
          data: {
            name: name,
            subject: subject
          }
        });
      }
    });
  } catch {
    throw new Error("Something went wrong trying to parse the CSV");
  }
}

async function roomMain(csvPath: string, database: PrismaClient) {
  try {
    // Read CSV file
    console.log("Reading CSV file...");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    // Parse CSV data
    console.log("Parsing CSV data...");
    const rooms: Array<string> = csvData.split("\n");
    console.log("Removing header line...");
    rooms.shift(); // Remove header line
    rooms.forEach(async (room: string) => {

      let rID: number | null;
      let tID: number | null;

      const [name, subject] = room.split(",");

      if (subject.length > 1) {
        const r = await database.rooms.create({
          data: {
            name: name,
            subject: subject
          }
        });
      }
    });
  } catch {
    throw new Error("Something went wrong trying to parse the CSV");
  }
}

const importCsvPath = path.resolve(__dirname, filename);
const exists = fs.existsSync(importCsvPath);

// All flag declarations
const force = args["force"] || args["F"] || false;
const generate = args["generate"] || args["G"] || false;
const device = args["device"] || args["D"] || false;
const teacher = args["teacher"] || args["T"] || false;
const room = args["room"] || args["R"] || false;
const specifics = device || teacher || room;

// Check if arg exists in args
if (force && !generate) {
  let tempArg = returnArg(["force", "F"], args);
  if (!tempArg) {
    throw new Error("Flag force or F not found.");
  }
  console.error(`WARNING: ${tempArg} cannot be used without --generate flag`);
} else if (exists && generate && !force) {
  console.error(
    `WARNING: This will overwrite the existing ${filename}. To overwrite, re-run the command using --force`
  );
} else if (exists && !generate && !specifics) {
  console.log("No specifics found. Please specify using  --device, --teacher or --room.");
} else if (exists && specifics && !generate) {
  // Create temp connection to the db
  const prisma = new PrismaClient();
  if (device) {
    deviceMain(importCsvPath, prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    })
  } else if (teacher) {

  }
}

/*
else if (exists && device) {
  // Create temp connection to the db and pass information through. Default information will go into the DEVICES table.
  const db = new PrismaClient();
  deviceMain(importCsvPath, db)
    .then(async () => {
      await db.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    });
} 
*/
