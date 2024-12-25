import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Check wallet balance",
  description: "A next application to check your wallet balance for different assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
