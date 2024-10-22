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
							<p className="font-bold my-3">
								編集中：{name}
								{page == 'students' && 'さん'}
							</p>
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
							className={`bg-rose-700 hover:bg-rose-800 text-white text-xs text-center p-2 mt-5 leading-none ${plusJakartaSans.className} font-bold`}
						>
							<a href="/schools" className="flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20px"
									viewBox="0 -960 960 960"
									width="20px"
									fill="#ffffff"
									className="mr-1"
								>
									<path d="M480-144 216-276v-240L48-600l432-216 432 216v312h-72v-276l-96 48v240L480-144Zm0-321 271-135-271-135-271 135 271 135Zm0 240 192-96v-159l-192 96-192-96v159l192 96Zm0-240Zm0 81Zm0 0Z" />
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
									height="19px"
									viewBox="0 -960 960 960"
									width="19px"
									fill="#ffffff"
									className="mr-1"
								>
									<path d="M360.11-408Q340-408 326-421.89q-14-13.88-14-34Q312-476 325.89-490q13.88-14 34-14Q380-504 394-490.11q14 13.88 14 34Q408-436 394.11-422q-13.88 14-34 14Zm240 0Q580-408 566-421.89q-14-13.88-14-34Q552-476 565.89-490q13.88-14 34-14Q620-504 634-490.11q14 13.88 14 34Q648-436 634.11-422q-13.88 14-34 14ZM480.46-168q130.46 0 221-91Q792-350 792-479.76q0-23.24-5-52.74-5-29.5-13-51.5-21 5-38 6.5t-40 1.5q-85.96 0-162.48-33.5T397-706q-37 78-93.5 129T170-500q-1 4-1.5 10t-.5 10q0 130 91 221t221.46 91ZM480-96q-79.38 0-149.19-30T208.5-208.5Q156-261 126-330.96t-30-149.5Q96-560 126-630q30-70 82.5-122t122.46-82q69.96-30 149.5-30t149.55 30.24q70 30.24 121.79 82.08 51.78 51.84 81.99 121.92Q864-559.68 864-480q0 79.38-30 149.19T752-208.5Q700-156 629.87-126T480-96Zm-55-691q46 63 117 101t154 38q12 0 21-.5t23-2.47Q691-720 625-756t-144.51-36q-12.49 0-26.47 1.5Q440.05-789 425-787ZM187-585q57-29 95-71.5T342-758q-63 37-100 78t-55 95Zm238-202Zm-83 29Z" />
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
