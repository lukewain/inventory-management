import { verifyUser } from "./client/actions";
import { AccessError, AdminDashboard } from "./components/pageComponents";

export default async function AdminPage() {
  // Fetch user metadata
  const canAccess = await verifyUser();

  return (
    <div>
      {canAccess && <AdminDashboard />} {!canAccess && <AccessError />}
    </div>
  );
}
