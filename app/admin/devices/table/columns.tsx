import { ColumnDef } from "@tanstack/react-table";
import { Device } from "@prisma/client";

export const columns: ColumnDef<Device>[] = [
  { id: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "room", header: "Room" },
  { accessorKey: "teacher", header: "Teacher" },
  { accessorKey: "addedAt", header: "Added At" },
];
