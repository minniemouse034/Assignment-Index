import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Pokedex14",
  description: "Generated Pokedex14 by create next14 app",
  icons: "/pokemon-logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`  bg-gray-700`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
