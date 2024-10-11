'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'
import {Plus_Jakarta_Sans} from 'next/font/google'
import Link from 'next/link'

interface Props {
	params?: {[key: string]: string}
	name?: string
	page?: string
}

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
})

export const Header: React.FC<Props> = ({params, name, page}) => {
	const [error, setError] = useState<string | null>(null)
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const router = useRouter()

	const toggleMenu = () => {
		setIsOpenMenu(!isOpenMenu)
	}

	const handleLogout = async () => {
		try {
			const res = await fetch('/api/logout', {
				method: 'POST',
				credentials: 'include',
			})
			if (!res.ok) {
				throw new Error('Logout failed')
			}
			router.push('/login')
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			}
		}
	}

	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<header className="flex justify-between items-center pt-5 px-3 pb-3 sm:p-5 sm:pb-3 tracking-wider">
				<h1 className={`text-white ${plusJakartaSans.className}`}>
					<a href="/students" className="flex items-center">
						<span className="mr-1">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
								<path d="M167-120q-21 5-36.5-10.5T120-167l40-191 198 198-191 40Zm191-40L160-358l458-458q23-23 57-23t57 23l84 84q23 23 23 57t-23 57L358-160Zm317-600L261-346l85 85 414-414-85-85Z" />
							</svg>
						</span>
						<span className="font-bold">EUREKA</span>
						<span className="font-bold border-2 border-white text-xs rounded-sm p-1 inline-block leading-none ml-2">STUDENT</span>
					</a>
				</h1>
				{page != 'login' && (
					<p>
						<button onClick={toggleMenu} className="text-white focus:outline-none m-0">
							<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
							</svg>
						</button>
					</p>
				)}
			</header>
			{isOpenMenu && (
				<nav className="p-8 rounded-lg bg-white inline-block w-auto absolute right-5 shadow-md">
					<ul className="">
						<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
							<Link href="/students" className="block">
								生徒一覧
							</Link>
						</li>
						<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
							<Link href="/students/create" className="block">
								生徒新規登録
							</Link>
						</li>
					</ul>

					{params && (
						<div>
							<p className="font-bold my-3">編集中：{name}さん</p>
							<ul className="pl-4 border-l-2 border-blue-100">
								<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
									<Link href={`/students/${params.id}/${params.year ? params.year : 2024}/scores`} className="block">
										成績登録
									</Link>
								</li>
								<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
									{' '}
									<Link href={`/students/${params.id}/${params.year ? params.year : 2024}/report`} className="block">
										成績レポート
									</Link>
								</li>
								<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
									{' '}
									<Link href={`/students/${params.id}`} className="block">
										生徒情報編集
									</Link>
								</li>
							</ul>
						</div>
					)}
					<p className="flex justify-center mx-auto mt-5">
						<ButtonItem type="button" text="ログアウト" onClick={handleLogout} />
					</p>
				</nav>
			)}
		</>
	)
}
