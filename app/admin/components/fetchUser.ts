import { clerkClient } from "@clerk/nextjs/server";

async function getUsers() {
  try {
    const data = await clerkClient.users.getUserList();
    return data;
  } catch {
    return null;
  }
}

export { getUsers };
