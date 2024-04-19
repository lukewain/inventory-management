"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import light from "@/images/light.svg";
import dark from "@/images/dark.svg";

type Theme = "light" | "dark";

function ThemeToggle({ initalValue }: { initalValue: Theme }) {
  const [theme, setTheme] = useState(initalValue);

  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme};path=/;`;
      document.querySelector("html")?.setAttribute("data-theme", theme);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, [theme]);

  return (
    <section className="justify-end mt-2 mr-1">
      {theme === "light" && (
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "dark")}
        >
          <Image src={dark} width={28} height={28} alt="light" />
        </button>
      )}
      {theme === "dark" && (
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Image src={light} width={28} height={28} alt="light" id="invert" />
        </button>
      )}
    </section>
  );
}

export default ThemeToggle;
