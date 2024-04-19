import { clerkClient } from "@clerk/nextjs/server";
import { getUsers } from "./components/fetchUser";

export default async function AdminPage() {
  const userList = await getUsers();
  let valid = false;
  if (userList !== null) {
    valid = true;
  } else {
    valid = false;
  }
  return <div className="ml-11">{valid && <h1>YIPPEEEEE</h1>}</div>;
}
