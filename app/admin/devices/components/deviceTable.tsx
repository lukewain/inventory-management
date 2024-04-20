import prisma from "@/app/prisma";

async function getDevices() {
  const devices = await prisma.device.findMany();
  if (devices.length < 1) {
    return (
      <div id="device-table">
        {devices.map((device) => (
          <tr>
            <th>{device.id}</th>
            <th>{device.name}</th>
            <th>{device.room}</th>
            <th>{device.teacher}</th>
            <th>{device.addedAt.toString()}</th>
          </tr>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export { getDevices };
