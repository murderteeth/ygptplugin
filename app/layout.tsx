import './globals.css'
import { JetBrains_Mono } from 'next/font/google'

const font = JetBrains_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'yearn chatgpt plugin',
  description: 'Talk to the Yearn protocol in real-time using ChatGPT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
