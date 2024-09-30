import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {Noto_Sans} from 'next/font/google'
import {Plus_Jakarta_Sans} from 'next/font/google'
import './globals.css'

// Noto Sans フォントのインスタンスを作成
const notoSans = Noto_Sans({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
})
const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
})

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'ユリイカ学習塾　生徒管理アプリ',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<body className={`${geistSans.variable} ${geistMono.variable} ${notoSans.className} antialiased min-h-screen`}>
				{children}
			</body>
		</html>
	)
}
