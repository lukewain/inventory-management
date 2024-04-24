import { SelectItem, SelectLabel, SelectGroup } from "@/components/ui/select";
import prisma from "@/app/prisma";
import { Rooms, Teacher } from "@prisma/client";

export async function PopulateSelectItemsRooms() {
  const rooms = await prisma.rooms.findMany();
  let existingRooms = false;
  if (rooms.length === 0) {
    existingRooms = false;
  } else {
    existingRooms = true;
  }

  return (
    <SelectGroup>
      <SelectLabel>Devices</SelectLabel>
      <SelectItem value="null">None</SelectItem>
      {existingRooms &&
        rooms.map((rm: Rooms) => (
          <SelectItem value={rm.name}>{rm.name}</SelectItem>
        ))}
    </SelectGroup>
  );
}

export async function PopulateSelectItemsTeachers() {
  const teachers = await prisma.teacher.findMany();
  let existingTeachers = false;
  if (teachers.length === 0) {
    existingTeachers = false;
  } else {
    existingTeachers = true;
  }

  return (
    <SelectGroup>
      <SelectLabel>Teachers</SelectLabel>
      <SelectItem value="null">None</SelectItem>
      {existingTeachers &&
        teachers.map((teach: Teacher) => (
          <SelectItem value={teach.name}>{teach.name}</SelectItem>
        ))}
    </SelectGroup>
  );
}
