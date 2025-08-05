import "./globals.css";
import type { Metadata } from "next";
import sun from "@/assets/images/Sun.png";

export const metadata: Metadata = {
  title: "weather App",
  description: "weather App for getting insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Weather APP</title>
        <link rel="icon" href={"/wImage.jpg"} />
      </head>
      <body className="font-satoshi">{children}</body>
    </html>
  );
}
