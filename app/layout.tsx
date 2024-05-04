import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { CustomNavbar } from "../common/components/CustonVerticalNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projector",
  description: "Projector application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="flex min-h-screen">
            <CustomNavbar />
            <div className="w-full">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
