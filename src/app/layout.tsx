import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fake generator schema",
  description: "Generate fake data for any prompt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed top-0 left-2 z-50">
          <Image
            src="/datastack.png"
            alt="Datastack Logo"
            width={140} 
            height={140} 
          />
        </div>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
