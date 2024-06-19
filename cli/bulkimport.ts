// Check if import.csv exists

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

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
async function main(csvPath: string, database) {
  try {
    // Read CSV file
    console.log("Reading CSV file...");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    // Parse CSV data
    console.log("Parsing CSV data...");
    const devices = csvData.split("\n");
    console.log("Removing header line...");
    devices.shift(); // Remove header line
    const parsedDevices = devices.map(async (device) => {
      const [name, room, teacher] = device.split(",");
      const d = await database.devices.create({
        data: {
          name: name,
          room: room,
          teacher: teacher,
        },
      });
      console.log(`Device ${d} created.`);
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
} else if (exists) {
  // Create temp connection to the db and pass information through. Default information will go into the DEVICES table.
  const db = new PrismaClient();
  main(importCsvPath, db)
    .then(async () => {
      await db.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    });
}
