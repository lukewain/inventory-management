// Check if import.csv exists

const fs = require("fs");
const path = require("path");
import { PrismaClient } from "@prisma/client";
import { deviceFetch, roomFetch, teacherFetch } from "./functions/fetch";
import { deviceCreate, roomCreate, teacherCreate } from "./functions/create";
import { getFilename, devices, rooms, teachers } from "./functions/helper";

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
let filename: string = getFilename(args);

// console.log(args);

// Async write function

const importCsvPath = path.resolve(__dirname, filename);
const exists = fs.existsSync(importCsvPath);

// Headers for example files

function generateCSV(headers: Array<string>, filename: string) {
  const csvData = headers.join(",") + "\n";
  fs.writeFileSync(filename, csvData);
  console.log(`Generated ${filename}`);
  process.exit(0);
}

// All flag declarations
const force = args["force"] || args["F"] || false;
const generate = args["generate"] || args["G"] || false;
const device = args["device"] || args["D"] || false;
const teacher = args["teacher"] || args["T"] || false;
const room = args["room"] || args["R"] || false;
const fetch = args["fetch"] || false;
const specifics = device || teacher || room;

// Check if arg exists in args
if (!exists && !generate && !specifics) {
  console.log(
    `No file found. Please use --generate and --device, --teacher or --room\nIf you would like to change the filename, use --name <filename>`
  );
  process.exit(0);
} else if (force && !generate) {
  let tempArg = returnArg(["force", "F"], args);
  if (!tempArg) {
    throw new Error("Flag force or F not found.");
  }
  console.error(`WARNING: ${tempArg} cannot be used without --generate flag`);
} else if ((force && generate) || (!exists && generate)) {
  if (!specifics) {
    console.log(
      "No specifics found. Please specify using  --device, --teacher or --room."
    );
    process.exit(0);
  } else if (device) {
    generateCSV(devices, filename);
  } else if (teacher) {
    generateCSV(teachers, filename);
  } else if (room) {
    generateCSV(rooms, filename);
  }
} else if (exists && generate && !force) {
  console.error(
    `WARNING: This will overwrite the existing ${filename}. To overwrite, re-run the command using --force`
  );
} else if (exists && !generate && !specifics) {
  console.log(
    "No specifics found. Please specify using  --device, --teacher or --room."
  );
} else if (exists && specifics && !generate) {
  // Create temp connection to the db
  const prisma = new PrismaClient();
  if (device) {
    deviceCreate(importCsvPath, prisma)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } else if (teacher) {
    teacherCreate(importCsvPath, prisma)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } else if (room) {
    roomCreate(importCsvPath, prisma)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }
} else if (fetch && !specifics) {
  console.error(`Please specify using  --device, --teacher or --room`);
} else if (fetch && specifics) {
  const prisma = new PrismaClient();
  if (device) {
    deviceFetch(prisma)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } else if (teacher) {
    teacherFetch(prisma)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } else if (room) {
    roomFetch(prisma)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
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
