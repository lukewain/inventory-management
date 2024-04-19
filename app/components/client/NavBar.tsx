import { cookies } from "next/headers";
import ThemeToggle from "./ThemeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

function NavBar() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  return (
    <nav className="flex items-center flex-wrap p-3" id="navbar">
      <span className="text-xl font-extrabold tracking-wide ml-3">
        Westleigh Inventory System
      </span>
      <div className="w-auto justify-end inline-flex flex-grow mr-3 mt-1 gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle initalValue={theme?.value as "light" | "dark"} />
      </div>
    </nav>
  );
}

export default NavBar;
