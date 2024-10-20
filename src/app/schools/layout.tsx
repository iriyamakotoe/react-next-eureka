import type {Metadata} from 'next'
import localFont from 'next/font/local'
import '../globals.css'

const geistSans = localFont({
	src: '../fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: '../fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'EUREKA SCHOOL APP',
	description: '',
}

export default function SchoolsLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="ja">
			<body className={`category-schools bg-rose-900 ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				{children}
			</body>
		</html>
	)
}
