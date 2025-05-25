import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StrumSync - Real-time Music Tab Generation",
  description: "Turn any song into perfect tabs with AI-powered real-time generation and sync",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Load VexFlow library */}
        <Script src="https://unpkg.com/vexflow@4.2.2/build/cjs/vexflow.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
