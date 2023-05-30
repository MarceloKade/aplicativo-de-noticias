import './globals.css'
import { ReactNode } from 'react'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Aplicativo de notícias',
  description: 'Aplicativo de notícias, com opção de escolher a categoria e ao clicar na notícia abre um modal com a descrição completa do conteúdo. Feito com Next.js, TypeScript, Tailwind CSS e Axios.',
}

export default function RootLayout({ children, }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} bg-gray-900 font-sans text-gray-100 `}>{children}</body>
    </html>
  )
}