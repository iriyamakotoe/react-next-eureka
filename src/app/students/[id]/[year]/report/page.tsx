'use client'

import React, {useState, useEffect} from 'react'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {LineChart} from '@/components/LineChart'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'

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

	if (loading) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">成績レポート</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<h3 className="mb-2 text-lg font-bold tracking-tight">
						{scores.students.name}さん（{scores.year}年度）
					</h3>
					<LineChart scores={scores} />
					<div className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5">
						<p>{scores.comments}</p>
					</div>
					<p className="flex justify-center mx-auto mt-10">
						<ButtonItem type="submit" text="印刷" onClick={handlePrint} style="primary" />
					</p>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Report
