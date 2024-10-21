'use client'

import useFetchSchools from '../hooks/useFetchSchools'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'
import {ErrorForm} from '@/components/ErrorForm'

interface School {
	id: number
	name: string
}

const Schools = () => {
	const {schools, loading, error} = useFetchSchools(null)
	const [selectedYear, setSelectedYear] = useState<{[key: number]: string}>({})
	const [selectedGrade] = useState('1')
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const router = useRouter()

	const createSchool = () => {
		router.push('/schools/create')
	}

	const editSchool = (id: number) => {
		router.push(`/schools/${id}`)
	}

	const handleSelect = (id: number, year: string) => {
		setSelectedYear((prevYears) => ({
			...prevYears,
			[id]: year,
		}))
	}

	const handleSheets = async (id: number, year: string, grade: string) => {
		const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
			method: 'GET',
			credentials: 'include',
		})
		if (res.ok) {
			router.push(`/schools/${id}/${year}/${grade}/sheets`)
		} else {
			createSheet(id, year, grade)
		}
	}

	const createSheet = async (id: number, year: string, grade: string) => {
		const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				school_id: id,
				year: year,
				grade: grade,
			}),
		})
		if (res.ok) {
			router.push(`/schools/${id}/${year}/${grade}/sheets`)
		} else {
			const data = await res.json()
			setErrorForm(() => ({
				flag: true,
				message: data.message,
			}))
			setTimeout(() => {
				setErrorForm(() => ({
					flag: false,
					message: '',
				}))
			}, 4000)
			return
		}
	}

	if (loading || !schools) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header page="schools" />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">学校一覧</h2>
					<div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-3 mb-5">
						<p className="flex justify-center">
							<ButtonItem type="button" text="新規学校登録" onClick={createSchool} style="primary" />
						</p>
					</div>

					{Object.values(schools).map((school: School) => (
						<section key={school.id}>
							<div className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5">
								<div className="p-5 pr-3">
									<div className="flex justify-between">
										<h3 className="mb-2 text-lg font-bold tracking-tight">{school.name}</h3>
										<ButtonItem type="button" text="編集" onClick={() => editSchool(school.id)} />
									</div>
									<p>
										<select
											name="year"
											id="year"
											value={selectedYear[school.id] || '2024'}
											onChange={(e) => handleSelect(school.id, e.target.value)}
											className="rounded py-1.5 px-2 mr-2 inline-block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
										>
											<option value="2024">2024</option>
											<option value="2025">2025</option>
										</select>
										<ButtonItem
											type="button"
											text="答案用紙登録"
											onClick={() => handleSheets(school.id, selectedYear[school.id] || '2024', selectedGrade)}
										/>
									</p>
									{errorForm.flag && <ErrorForm message={errorForm.message} />}
								</div>
							</div>
						</section>
					))}
					<div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-3 mb-5">
						<p className="flex justify-center">
							<ButtonItem type="button" text="新規学校登録" onClick={createSchool} style="primary" />
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
export default Schools
