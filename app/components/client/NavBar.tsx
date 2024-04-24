import { cookies } from "next/headers";
import ThemeToggle from "./ThemeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MapLinks from "./MapButtons";
import { TimeStatus } from "../ui/CurrentTime";

function NavBar() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  return (
    <nav className="flex items-center flex-wrap p-3" id="navbar">
      <span className="text-xl font-extrabold tracking-wide ml-3">
        Westleigh Inventory System
      </span>
      <span className="ml-8 font-bold" id="current-time">
        <TimeStatus />
      </span>
      <div className="w-auto justify-end inline-flex flex-grow mr-3 gap-5">
        <MapLinks />

        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle initalValue={theme?.value as "light" | "dark"} />
      </div>
    </nav>
  );
}

export default NavBar;
