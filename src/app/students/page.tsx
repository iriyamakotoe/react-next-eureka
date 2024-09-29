'use client'

import {supabase} from '@/utils/supabase'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {Header} from '@/components/Header'

const Students = () => {
	const [students, setStudents] = useState(null)
	const [selectedYear, setSelectedYear] = useState('2024')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
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

	const [errorMessage, setErrorMessage] = useState('')

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
			setErrorMessage(data.message)
			return
		}
	}

	if (loading) return <p>読み込み中...</p>
	if (error) return <p>エラーが発生しました: {error}</p>

	return (
		<>
			<Header />
			<main className="p-5">
				<h2 className="pageTitle">生徒一覧</h2>
				<button
					onClick={createStudent}
					type="button"
					class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:shadow-outline focus:outline-none"
				>
					新規生徒登録
				</button>

				{students.map((student) => (
					<section key={student.id}>
						<div class="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full">
							<div class="p-7">
								<div className="flex justify-between">
									<h2 class="mb-2 text-lg font-bold leading-none tracking-tight">{student.name}</h2>
									<button
										onClick={() => editStudent(student.id)}
										class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90"
									>
										編集
									</button>
								</div>
								<p class="mb-5 text-neutral-500">
									{student.school}　{student.grade}年生
									<br />
									{student.note}
								</p>
								<p>
									成績
									<select name="year" id="year" value={selectedYear} onChange={handleSelect}>
										<option value="2024">2024</option>
									</select>
									<button
										onClick={() => fetchScore(student.id, selectedYear)}
										class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90"
									>
										登録
									</button>
								</p>
								<p className="error form-error text-center">{errorMessage}</p>
							</div>
						</div>
					</section>
				))}
			</main>
		</>
	)
}

export default Students
