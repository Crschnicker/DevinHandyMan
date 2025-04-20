import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevinofallTrades | Professional Handyman Services in Bradenton, Palmetto & Sarasota",
  description: "Professional handyman services for home repairs, improvements, and maintenance in Bradenton, Palmetto, and Sarasota. Quality workmanship and reliable service.",
  keywords: "handyman, home repair, Bradenton, Palmetto, Sarasota, home improvement, professional handyman, reliable service, painting, drywall, electrical, furniture assembly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}