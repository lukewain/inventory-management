import prisma from "@/app/prisma";
import { FormSchema } from "@/app/admin/devices/components/AddDevice";
import { z } from "zod";

export async function AddDevice(values: z.infer<typeof FormSchema>) {
  const res = await prisma.device.create({
    data: {
      name: values.deviceName,
      room: values.roomName,
      teacher: values.teacherName,
    },
  });

  if (!res) {
    return { success: true, error: false };
  } else return { success: false, error: true };
}
