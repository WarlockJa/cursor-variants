import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import PageTransitionEffect from "@/contexts/PageTransitionEffect";
import AuroraEffect from "@/components/AuroraEffect/AuroraEffect";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cursor Variants",
  description: "Cursor effects showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dancingScript.className}>
        <Nav />
        <AuroraEffect />
        <PageTransitionEffect>{children}</PageTransitionEffect>
      </body>
    </html>
  );
}
