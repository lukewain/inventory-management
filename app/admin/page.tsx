import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { AccessError, AdminDashboard } from "./components/pageComponents";

async function verifyUser() {
  const connectedUser = await currentUser();
  if (!connectedUser) {
    return false;
  }
  if (connectedUser.publicMetadata.isAdmin === true) {
    return true;
  } else {
    return false;
  }
}

export default async function AdminPage() {
  // Fetch user metadata
  const canAccess = await verifyUser();

  return (
    <div>
      {canAccess && <AdminDashboard />} {!canAccess && <AccessError />}
    </div>
  );
}
