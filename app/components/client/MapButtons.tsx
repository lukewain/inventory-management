"use client";

import Link from "next/link";
import { links, link } from "./links";
import { usePathname } from "next/navigation";

function getClass(l: link): string {
  if (l.link !== usePathname()) {
    const className: string = `${l.className}`;
    return className;
  } else return `${l.className} pointer-events-none`;
}

function getID(l: link): string {
  if (l.link !== usePathname()) {
    return "active";
  } else return "inactive";
}

export default function MapLinks() {
  const buttons = [
    links.map((l) => (
      <Link className={getClass(l)} id={getID(l)} href={l.link}>
        {l.text}
      </Link>
    )),
  ];

  return <div className="flex mt-1 items-center gap-3">{buttons}</div>;
}
