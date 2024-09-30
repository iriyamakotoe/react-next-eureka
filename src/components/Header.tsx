'use client'

import {supabase} from '@/utils/supabase'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Plus_Jakarta_Sans} from 'next/font/google'
import {ErrorFetch} from '@/components/ErrorFetch'

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
})

export const Header = () => {
	const [error, setError] = useState(null)
	const router = useRouter()

	const handleLogout = async () => {
		const {error} = await supabase.auth.signOut()

		if (error) {
			setError('ログアウト中にエラーが発生しました。')
			return
		}

		router.push('/login')
	}

	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<header className="flex justify-between items-center p-5 pb-2 text-white tracking-wider bg-theme-800">
				<h1 className={plusJakartaSans.className}>
					<a href="/students" className="flex ">
						<span className="mr-1">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
								<path d="M167-120q-21 5-36.5-10.5T120-167l40-191 198 198-191 40Zm191-40L160-358l458-458q23-23 57-23t57 23l84 84q23 23 23 57t-23 57L358-160Zm317-600L261-346l85 85 414-414-85-85Z" />
							</svg>
						</span>
						<span className="font-bold">EUREKA</span>
					</a>
				</h1>
				<p className="text-xs font-weight-normal">
					<button onClick={handleLogout}>LOGOUT</button>
				</p>
			</header>
		</>
	)
}
