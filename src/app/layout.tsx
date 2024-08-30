import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Head from "next/head";

// Styles
import "@/styles/globals.css";

// Components
import { Navbar } from "./_components/navbar";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>BARK</title>
        <meta name="description" content="Web3 Payments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
