import { verifyUser } from "@/app/admin/client/actions";
import { AccessError } from "../components/pageComponents";

export default async function UserPage() {
  const canAccess = await verifyUser();
  return <div>{!canAccess && <AccessError />}</div>;
}
