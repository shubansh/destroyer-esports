import './globals.css'
import { Inter, Roboto_Mono, Outfit } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto_mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Destroyer Esports',
  description: 'Dominating the arena. Indian Esports Organization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto_mono.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased overflow-x-hidden bg-cinematic`}>
        <Navbar />
        <main className="flex-grow pt-20 min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>

    </html>
  )
}
