import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Image from "next/image"; // Import Next.js Image component
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
            src="/datastack.png" // Path to your image in the lib folder
            alt="Datastack Logo"
            width={140} // Adjust the width as needed
            height={140} // Adjust the height as needed
          />
        </div>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
