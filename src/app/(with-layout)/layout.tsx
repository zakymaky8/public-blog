import type { Metadata } from "next";
import "../globals.css";
import Header from "../_lib/Header";
import Footer from "../_lib/footer";

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
