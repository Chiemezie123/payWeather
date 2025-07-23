import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "weather App", // Your app title
  description: "weather App for getting insights", // Your app description
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
      </head>
      <body className="font-satoshi">{children}</body>
    </html>
  );
}
