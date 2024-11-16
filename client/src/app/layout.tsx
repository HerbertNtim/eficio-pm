import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./DashboardWrapper";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Eficio-Project-Management",
  description: "Conveying Streamlined Project Handling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}antialiased`}
      >
        <DashboardWrapper>
          {children}
        </DashboardWrapper>
      </body>
    </html>
  );
}
