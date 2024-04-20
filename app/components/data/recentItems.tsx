import prisma from "@/app/prisma";

async function RecentItems() {
  let recentDevices = await prisma.device.findMany({
    orderBy: {
      addedAt: "desc",
    },
  });

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
