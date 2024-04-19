import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
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
  const theme = cookieStore.get('theme');
  return (
    <html lang="en" data-theme={theme?.value}>
      <body className={inter.className}>
        <ThemeToggle initalValue={theme?.value as ('light' | 'dark')} />
        {children}
        </body>
    </html>
  );
}
