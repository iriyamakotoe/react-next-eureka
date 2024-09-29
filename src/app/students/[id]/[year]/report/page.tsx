'use client'

import React, {useState, useEffect} from 'react'
import {Header} from '@/components/Header'
import {LineChart} from '@/components/LineChart'

const Report = ({params}) => {
	const [scores, setScores] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const {year, id} = params

	useEffect(() => {
		if (!scores) {
			fetchScores()
		}
		console.log(scores)
	}, [scores])

	const fetchScores = async () => {
		try {
			const res = await fetch(`/api/students/${id}/${year}/scores`)
			if (!res.ok) {
				throw new Error('データの取得に失敗しました')
			}
			const data = await res.json()
			setScores(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const handlePrint = () => {
		window.print()
	}

	if (loading) return <p>読み込み中...</p>
	if (error) return <p>エラーが発生しました: {error}</p>

	return (
		<>
			<Header />
			<main>
				<h2 className="page-title">成績レポート</h2>
				<p className="page-title">
					お名前：{scores.students.name} さん
					<br />
					年度：{year}
				</p>
				<LineChart scores={scores} />
				<p>
					塾からのコメント：
					<br />
					{scores.comments}
				</p>
				<button onClick={handlePrint}>印刷</button>
			</main>
		</>
	)
}

export default Report
