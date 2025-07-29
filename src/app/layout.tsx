import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Menu, Footer } from "@/components/layout"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#171717] text-white`}
      >
        <Menu />
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
