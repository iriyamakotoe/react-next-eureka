'use client'

import {supabase} from '@/utils/supabase'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorForm} from '@/components/ErrorForm'

const Students = () => {
	const [students, setStudents] = useState(null)
	const [selectedYear, setSelectedYear] = useState('2024')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const router = useRouter()

	useEffect(() => {
		fetchStudents()
	}, [])

	const fetchStudents = async () => {
		try {
			const {data: sessionData} = await supabase.auth.getSession()
			const token = sessionData?.session?.access_token

			if (!token) {
				throw new Error('ユーザーがログインしていません')
			}

			const res = await fetch('/api/students', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			if (!res.ok) {
				throw new Error('データの取得に失敗しました')
			}
			const data = await res.json()
			setStudents(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const createStudent = () => {
		router.push('/students/create')
	}

	const editStudent = (id) => {
		router.push(`/students/${id}`)
	}

	const handleSelect = (e) => {
		setSelectedYear(e.target.value)
	}

	const fetchScore = async (id, year) => {
		const res = await fetch(`/api/students/${id}/${year}/scores`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			router.push(`/students/${id}/${year}/scores`)
		} else {
			createScore(id, year)
		}
	}

	const createScore = async (id, year) => {
		const res = await fetch(`/api/students/${id}/${year}/scores`, {
			method: 'POST',
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
			router.push(`/students/${id}/${year}/scores`)
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

	if (loading) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">生徒一覧</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-3 mb-5">
						<p className="flex justify-center">
							<ButtonItem type="button" text="新規生徒登録" onClick={createStudent} style="primary" />
						</p>
					</div>

					{students.map((student) => (
						<section key={student.id}>
							<div class="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5">
								<div class="p-5">
									<div className="flex justify-between">
										<h3 class="mb-2 text-lg font-bold tracking-tight">{student.name}</h3>
										<ButtonItem type="button" text="編集" onClick={() => editStudent(student.id)} />
									</div>
									<p class="mb-5 text-neutral-500">
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
											className="rounded py-1 px-3 mr-3 inline-block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
										>
											<option value="2024">2024</option>
										</select>
										<ButtonItem type="button" text="成績登録" onClick={() => fetchScore(student.id, selectedYear)} />
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
