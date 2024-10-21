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
	page?: 'students' | 'schools' | 'login'
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
					<a href={page == 'schools' ? '/schools' : '/students'} className="flex items-center">
						<span className="mr-1">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
								<path d="M167-120q-21 5-36.5-10.5T120-167l40-191 198 198-191 40Zm191-40L160-358l458-458q23-23 57-23t57 23l84 84q23 23 23 57t-23 57L358-160Zm317-600L261-346l85 85 414-414-85-85Z" />
							</svg>
						</span>
						<span className="font-bold">EUREKA</span>
						{/* {page != 'login' && ( */}
						<span className="font-bold border-2 border-white text-xs rounded-sm p-1 inline-block leading-none ml-2">
							{page == 'schools' ? 'SCHOOL' : 'STUDENT'}
						</span>
						{/* )} */}
					</a>
				</h1>
				{page != 'login' && (
					<p>
						<button onClick={toggleMenu} className="text-white focus:outline-none m-0 p-1">
							<div className={`btn-trigger ${isOpenMenu && 'active'}`} id="btn03">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>
					</p>
				)}
			</header>

			{page != 'login' && (
				<nav
					className={`p-8 rounded-lg bg-white inline-block w-auto absolute right-3 sm:right-5 shadow-md transition-opacity duration-500 ${isOpenMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
				>
					<ul>
						{page == 'students' ? (
							<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
								<Link href="/students" className="block">
									生徒一覧
								</Link>
							</li>
						) : (
							<li className="px-4 py-2 hover:bg-rose-50 rounded-lg">
								<Link href="/schools" className="block">
									学校一覧
								</Link>
							</li>
						)}

						{page == 'students' ? (
							<li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
								<Link href="/students/create" className="block">
									生徒新規登録
								</Link>
							</li>
						) : (
							<li className="px-4 py-2 hover:bg-rose-50 rounded-lg">
								<Link href="/schools/create" className="block">
									学校新規登録
								</Link>
							</li>
						)}
					</ul>

					{params && (
						<div>
							<p className="font-bold my-3">編集中：{name}さん</p>
							{page == 'students' ? (
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
							) : (
								<ul className="pl-4 border-l-2 border-rose-100">
									<li className="px-4 py-2 hover:bg-rose-50 rounded-lg">
										<Link href={`/schools/${params.id}/${params.year ? params.year : 2024}/${params.grade}/sheets`} className="block">
											答案用紙登録
										</Link>
									</li>
									{/* <li className="px-4 py-2 hover:bg-blue-50 rounded-lg">
										{' '}
										<Link href={`/schools/${params.id}/${params.year ? params.year : 2024}/report`} className="block">
											成績レポート
										</Link>
									</li> */}
									<li className="px-4 py-2 hover:bg-rose-50 rounded-lg">
										{' '}
										<Link href={`/schools/${params.id}`} className="block">
											学校情報編集
										</Link>
									</li>
								</ul>
							)}
						</div>
					)}

					<p className="flex justify-center mx-auto mt-5">
						<ButtonItem type="button" text="ログアウト" onClick={handleLogout} />
					</p>

					{page == 'students' ? (
						<p
							className={`bg-rose-700 hover:bg-rose-800 text-white text-xs text-center py-1 px-2 mt-5 leading-none ${plusJakartaSans.className} font-bold`}
						>
							<a href="/schools" className="flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="#ffffff"
									className="mr-1"
								>
									<path d="M326.45-189.36q-19.31 0-33.6-14.29-14.28-14.28-14.28-33.59v-87.41h116.11V-453.6q-38.28 5.59-77.06-5.98-38.79-11.57-66.68-39.12v-57.4H197.4L78.12-676.11q36.01-31.35 81.48-49.65 45.47-18.3 93.96-18.3 34.28 0 71.89 10.57 37.62 10.58 69.23 32.84v-73.54h420.58v494.86q0 37.76-26.11 63.86-26.11 26.11-63.61 26.11H326.45Zm116.11-135.29h240.89v45.32q0 18.71 11.69 30.4 11.69 11.69 30.4 11.69 18.45 0 30.14-11.69 11.69-11.69 11.69-30.4v-446.98H442.56v61.53L670.6-436.74v33.89h-34.37L512.91-525.44l-20.24 21.48q-11.71 12.78-23.94 20.65-12.23 7.86-26.17 14.32v144.34ZM218.6-603.99h80.22v82.44q18.23 11.79 35.53 17.08 17.3 5.29 34.28 5.29 25.84 0 50.38-11.95 24.54-11.95 39.67-27.61l20.33-21.07-69.93-69.93q-31.86-32.11-71.32-49.27-39.47-17.17-84.08-17.17-28.63 0-53.65 7.46t-47.25 19.13l65.82 65.6Zm416.97 327.22H326.45v39.53h322.49q-6.46-7.21-9.92-17.31-3.45-10.1-3.45-22.22Zm-309.12 39.53v-39.53 39.53Z" />
								</svg>
								SCHOOL
							</a>
						</p>
					) : (
						<p
							className={`bg-sky-700 hover:bg-sky-800 text-white text-xs text-center p-2 mt-5 leading-none ${plusJakartaSans.className} font-bold`}
						>
							<a href="/students" className="flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="18px"
									viewBox="0 -960 960 960"
									width="18px"
									fill="#ffffff"
									className="mr-1"
								>
									<path d="M353.77-383q-22.77 0-38.27-15.73-15.5-15.72-15.5-38.5 0-22.77 15.73-38.27 15.72-15.5 38.5-15.5 22.77 0 38.27 15.73 15.5 15.72 15.5 38.5 0 22.77-15.73 38.27-15.72 15.5-38.5 15.5Zm253 0q-22.77 0-38.27-15.73-15.5-15.72-15.5-38.5 0-22.77 15.73-38.27 15.72-15.5 38.5-15.5 22.77 0 38.27 15.73 15.5 15.72 15.5 38.5 0 22.77-15.73 38.27-15.72 15.5-38.5 15.5ZM480-140q142.38 0 241.19-98.95T820-480.47q0-25.53-4-50.53t-10-46q-20 5-43.26 7-23.26 2-48.74 2-97.11 0-183.56-40Q444-648 383-722q-34 81-97.5 141.5T140-487v7q0 142.37 98.81 241.19Q337.63-140 480-140Zm0 60q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-92-727q88 103 162.5 141T714-628q24 0 38-1t31-6q-45-81-122.5-133T480-820q-27 0-51 4t-41 9ZM149-558q48-18 109.5-81.5T346-793q-87 39-131.5 99.5T149-558Zm239-249Zm-42 14Z" />
								</svg>
								STUDENT
							</a>
						</p>
					)}
				</nav>
			)}
		</>
	)
}
