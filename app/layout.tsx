import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import NavBar from "@/app/components/client/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Westleigh Inventory System",
  description: "Created by Luke W",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  return (
    <ClerkProvider>
      <html lang="en" data-theme={theme?.value}>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
