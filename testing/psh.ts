import { exec } from "child_process";

exec(
  "Search-ADAccount -LockedOut | Where-Object {$_.enabled -eq 'True'} | Select SamAccountName",
  { shell: "powershell.exe" },
  (err, output) => {
    if (err) {
      console.error("Could not execute command: ", err);
      return;
    }
    console.log("Unfiltered output \n", output);
    let splitOutput = output.split("\n");
    splitOutput = splitOutput.splice(0, 2);
    console.log("Output \n", splitOutput);
  }
);
