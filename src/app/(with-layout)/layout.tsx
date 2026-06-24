import type { Metadata } from "next";
import "../globals.css";
import Header from "../_lib/Header";
import Footer from "../_lib/footer";

export const metadata: Metadata = {
  title: {
    template: "%s - Tip Logger",
    default: "Tip Logger"
  },

  keywords: ["blog", "blogs", "technical blogs", "personal blogs", "nextjs blog", "react blog", "javascript blog", "typescript blog", "web development blog", "programming blog", "coding blog", "software development blog", "dev tips", "tech tips", "life tips", "productivity tips", "self improvement tips"],
  authors: [{ name: "Zechariah Mekuaninit", url: "https://zach-log.vercel.app" }],
  creator: "Zechariah Mekuaninit",
  publisher: "Zechariah Mekuaninit",
  openGraph: {
    title: "Tip Logger",
    description: "Tip Logger is a blogging platform where I share my thoughts and ideas on Technical and Personal Tips with people who likes to read blog articles.",
    url: "https://zach-log.vercel.app",
    siteName: "Tip Logger",
    images: [
      {
        url: "/blog-post_f68f.svg",
        width: 1200,
        height: 630,
        alt: "Tip Logger" 
      }
    ],
    locale: "en-US",
    type: "website"
  },

  description: "Tip Logger is a blogging platform where I share my thoughts and ideas on Technical and Personal Tips with people who likes to read blog articles.",
  twitter: {
    card: "summary_large_image",
    title: "Tip Logger",
    description: "Tip Logger is a blogging platform where I share my thoughts and ideas on Technical and Personal Tips with people who likes to read blog articles.",
    site: "@tiplogger",
    creator: "@tiplogger",
    images: {
      url: "https://tip-logger.vercel.app/og-image.png",
      width: 1200,
      height: 630,
      alt: "Tip Logger"
    }
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col justify-between bg-slate-300`} style={{minHeight: "100vh"}}>
        <Header />
        <div className="flex-auto mb-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
