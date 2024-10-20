'use client'

import useFetchStudents from '../hooks/useFetchStudents'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'
import {ErrorForm} from '@/components/ErrorForm'

interface Student {
	id: number
	name: string
	school: string
	grade: number
	note: string
}

const Students = () => {
	const {students, loading, error} = useFetchStudents(null)
	const [selectedYear, setSelectedYear] = useState(2024)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const router = useRouter()

	const createStudent = () => {
		router.push('/students/create')
	}

	const editStudent = (id: number) => {
		router.push(`/students/${id}`)
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(Number(e.target.value))
	}

	const handleScore = async (id: number | string, year: number, page: string) => {
		const res = await fetch(`/api/students/${id}/${year}/scores`, {
			method: 'GET',
			credentials: 'include',
		})
		if (res.ok) {
			router.push(`/students/${id}/${year}/${page}`)
		} else {
			createScore(id, year, page)
		}
	}

	const createScore = async (id: number | string, year: number, page: string) => {
		const res = await fetch(`/api/students/${id}/${year}/scores`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				student_id: id,
				year: year,
				sem1: {mid: '', end: ''},
				sem2: {mid: '', end: ''},
				sem3: {mid: '', end: ''},
				comments: null,
			}),
		})
		if (res.ok) {
			router.push(`/students/${id}/${year}/${page}`)
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

	if (loading || !students) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header page="students" />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">生徒一覧</h2>
					<div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-3 mb-5">
						<p className="flex justify-center">
							<ButtonItem type="button" text="新規生徒登録" onClick={createStudent} style="primary" />
						</p>
					</div>

					{Object.values(students).map((student: Student) => (
						<section key={student.id}>
							<div className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5">
								<div className="p-5 pr-3">
									<div className="flex justify-between">
										<h3 className="mb-2 text-lg font-bold tracking-tight">{student.name}</h3>
										<ButtonItem type="button" text="編集" onClick={() => editStudent(student.id)} />
									</div>
									<p className="mb-5 text-neutral-500 pr-2">
										{student.school}　{student.grade}年生
										<br />
										{student.note}
									</p>
									<p>
										<select
											name="year"
											id="year"
											value={selectedYear}
											onChange={handleSelect}
											className="rounded py-1.5 px-2 mr-2 inline-block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
										>
											<option value="2024">2024</option>
											<option value="2025">2025</option>
										</select>
										<ButtonItem type="button" text="成績登録" onClick={() => handleScore(student.id, selectedYear, 'scores')} />
										<ButtonItem type="button" text="レポート" onClick={() => handleScore(student.id, selectedYear, 'report')} />
									</p>
									{errorForm.flag && <ErrorForm message={errorForm.message} />}
								</div>
							</div>
						</section>
					))}
					<div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-3 mb-5">
						<p className="flex justify-center">
							<ButtonItem type="button" text="新規生徒登録" onClick={createStudent} style="primary" />
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
export default Students
