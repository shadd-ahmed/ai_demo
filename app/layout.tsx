import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Monofett } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const monofett = Monofett({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || "AI Demo",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "HPI Conference",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="relative min-h-screen overflow-x-hidden">
        {/* Background Wrapper with Blur */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/app_background.png')",
            filter: "blur(4px)", // Only blurs the background
          }}
        ></div>

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div>

        {/* Content Box */}
        <div className="relative z-10 mx-auto my-12 w-full max-w-screen-xl bg-gray-900 bg-opacity-95 p-4 md:p-6 lg:p-8 rounded-md shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
