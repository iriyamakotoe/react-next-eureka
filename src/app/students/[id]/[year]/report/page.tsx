'use client'

import useFetchScores from '../../../../hooks/useFetchScores'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {LineChart} from '@/components/LineChart'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'
import Link from 'next/link'

const Report = ({params}: {params: {[key: string]: string}}) => {
	const {id, year} = params
	const {scores, loading, error} = useFetchScores(id, year)

	const handlePrint = () => {
		window.print()
	}

	if (loading || !scores) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header page="students" params={params} name={scores.students.name} />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">成績レポート</h2>
					<h3 className="mb-2 text-lg font-bold tracking-tight">
						{scores.students.name}さん（{scores.year}年度）
					</h3>
					<LineChart scores={scores} />
					<div className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5">
						<p>{scores.comments}</p>
					</div>
					<p className="flex justify-center mx-auto mt-10 mb-5">
						<ButtonItem type="submit" text="印刷" onClick={handlePrint} style="primary" />
					</p>
					<p>
						<Link
							href={`/students/${id}/${year}/scores`}
							className="ico-back text-sm text-gray-700 flex justiry-center items-center"
						>
							成績登録
						</Link>
					</p>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Report
