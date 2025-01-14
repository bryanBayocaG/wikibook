import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import "./globals.css";
import { Providers } from "./providers";
import Alert from "@/components/ui/Alert";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WikiPok",
  description: "Personla Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/wki black.svg" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Alert />
        <ThemeProvider attribute="class">
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>

      </body>
    </html>
  );
}
