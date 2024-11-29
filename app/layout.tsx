import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Monofett } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

const monofett = Monofett({
  subsets: ['latin'],
  style: ['normal',],
  weight: ['400'],
})


export const metadata: Metadata = {
  title: "AI Demo",
  description: "HPI Conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
