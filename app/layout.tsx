import './globals.css'
// import { Inter } from 'next/font/google'
import { Chivo } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import Nav from '../components/Nav'

const chivo = Chivo({ subsets: ['latin'] })

export const metadata = {
  title: 'Feed!',
  description: 'Your feed!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className=' bg-[#FCF3E6]'>
        <body className={`${chivo.className} text-[#353535]`}>
          <Nav />
          <main className='max-w-5xl mx-auto'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
