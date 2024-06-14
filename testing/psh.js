"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
(0, child_process_1.exec)("Search-ADAccount -LockedOut | Where-Object {$_.enabled -eq 'True'} | Select SamAccountName", { shell: "powershell.exe" }, function (err, output) {
    if (err) {
        console.error("Could not execute command: ", err);
        return;
    }
    console.log("Unfiltered output \n", output);
    var splitOutput = output.split("\n");
    splitOutput = splitOutput.splice(0, 2);
    console.log("Output \n", splitOutput);
});
