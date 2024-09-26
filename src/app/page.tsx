'use client'

import {useState, useEffect} from 'react'
import {supabase} from '../../utils/supabase'
import {Header} from '../components/Header'

export default function Home() {
	const [student, setStudent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStudent = async () => {
			try {
			  const res = await fetch(`/api/students`);
			  if (!res.ok) {
				throw new Error('データの取得に失敗しました');
			  }
			  const data = await res.json();
			  setStudent(data);
			} catch (err) {
			  setError(err.message);
			} finally {
			  setLoading(false);
			}
		  };
	  
		  fetchStudent();
	}, [])

	if (loading) return <p>読み込み中...</p>;
	if (error) return <p>エラーが発生しました: {error}</p>;

	return (
		<>
			<Header />
			<main>
			<h2>生徒一覧</h2>
			<p>
				<a href="students/">生徒新規登録</a>
			</p>
				{student.map((student) => (
					<section key={student.id}>
					<dl className="mb-5">
						<dt>{student.name}</dt>
						<dd>{student.school}</dd>
						<dd>{student.grade}年生</dd>
						<dd>{student.note}</dd>
					</dl>
					<div className=''>
						<p><a href={`/students/${student.id}`}>編集</a></p>
						<p><a href={student.id}>成績</a></p>
					</div>
					</section>
				))}
			</main>
		</>
	)
}
