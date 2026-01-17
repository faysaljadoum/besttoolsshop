// app/layout.tsx
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Best tools ",
  description: "أفضل المنتجات للتنظيف والمنزل",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}