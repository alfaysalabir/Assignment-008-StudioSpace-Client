import "./globals.css";
import { Sora, DM_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Sora({ subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "StudioSpace | Rent Creative Studios by the Hour",
  description:
    "StudioSpace is a peer-to-peer marketplace for photo studios, sound stages, podcast lounges, music suites and art workshops.",
};

// sets the saved theme before the page paints (no white flash)
const themeScript = `try{if(localStorage.getItem("studio-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} font-body`}>
        <Providers>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
