"use client";

import Link from "next/link";
import { links, link } from "./links";
import { usePathname } from "next/navigation";

function getClass(l: link): string {
  if (l.link === usePathname()) return l.className;
  else return "";
}

export default function MapLinks() {
  const buttons = [
    links.map((l) => (
      <Link className={getClass(l)} href={l.link}>
        {l.text}
      </Link>
    )),
  ];

  return <div className="mt-2">{buttons}</div>;
}
