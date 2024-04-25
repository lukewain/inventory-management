import { currentUser } from "@clerk/nextjs/server";

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

async function verifyMemberModifications() {
  const connectedUser = await currentUser();
  if (!connectedUser) {
    return false;
  } else if (connectedUser.publicMetadata.edit_members === true) {
    return true;
  }
}

export { verifyUser, verifyMemberModifications };
