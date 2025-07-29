import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Menu, Footer } from "@/components/layout"
import "./globals.css"

// Import your custom fonts using Next.js font optimization
import { Instrument_Sans } from "next/font/google"
import { Bagel_Fat_One } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Configure Instrument Sans font with optimization
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

// Configure Bagel Fat One font with optimization
const bagelFatOne = Bagel_Fat_One({
  subsets: ["latin"],
  variable: "--font-bagel",
  display: "swap",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Hypachinko - Decentralized Gaming",
  description: "A modern decentralized gaming platform built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${bagelFatOne.variable} antialiased bg-[#171717] text-white`}
      >
        <Menu />
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
