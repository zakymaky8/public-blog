import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_lib/Header";
import Footer from "./_lib/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Tip Logger",
    default: "Tip Logger"
  },
  description: "Tip Logger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between bg-slate-300`} style={{minHeight: "100vh"}}>
        <Header />
        <div className="flex-auto mb-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
