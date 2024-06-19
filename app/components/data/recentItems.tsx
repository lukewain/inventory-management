import prisma from "@/app/prisma";
import { Prisma } from "@prisma/client";

async function RecentItems() {
  let recentDevices;
  {/*
    TODO: Add error response when database is unavailable.
  /*}
  try {
    recentDevices = await prisma.device.findMany({
      orderBy: {
        addedAt: "desc",
      },
    });
  } catch {
    recentDevices = [];
  }

  return (
    <div id="recent-devices" className="ml-4">
      {recentDevices.length > 0 &&
        recentDevices.map((rd) => (
          <p>
            {rd.id}: {rd.name}
          </p>
        ))}
      {recentDevices.length === 0 && <p>No recent devices</p>}
    </div>
  );
}

export { RecentItems };
