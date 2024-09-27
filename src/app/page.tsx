'use client'

import {supabase} from '@/utils/supabase'
import {useState, useEffect} from 'react'
import {Header} from '@/components/Header'

const Home = () => {
	const [students, setStudents] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

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

	if (loading) return <p>読み込み中...</p>
	if (error) return <p>エラーが発生しました: {error}</p>

	return (
		<>
			<Header />
			<main>
				<h2>生徒一覧</h2>
				<p>
					<a href="students/create">新規生徒登録</a>
				</p>
				{students.map((student) => (
					<section key={student.id}>
						<dl className="mb-5">
							<dt>{student.name}</dt>
							<dd>{student.school}</dd>
							<dd>{student.grade}年生</dd>
							<dd>{student.note}</dd>
						</dl>
						<div className="">
							<p>
								<a href={`/students/${student.id}`}>編集</a>
							</p>
							<p>
								<a href={student.id}>成績</a>
							</p>
						</div>
					</section>
				))}
			</main>
		</>
	)
}

export default Home
