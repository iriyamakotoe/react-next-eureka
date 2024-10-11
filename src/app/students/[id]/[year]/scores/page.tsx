'use client'

import useFetchScores from '../../../../hooks/useFetchScores'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {Semester} from '@/components/Semester'
import {TextAreaItem} from '@/components/TextAreaItem'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'
import {ErrorForm} from '@/components/ErrorForm'
import {SuccessForm} from '@/components/SuccessForm'
import Link from 'next/link'

type SemObj = {
	mid: {[key: string]: number}
	end: {[key: string]: number}
}

interface Scores {
	student_id: number
	year: number
	sem1: SemObj
	sem2: SemObj
	sem3: SemObj
	comments: string
	students: {name: string; id: number}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

const Scores = ({params}: {params: {[key: string]: string}}) => {
	const {id, year} = params
	const {scores, loading, error} = useFetchScores(id, year)

	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)
	const router = useRouter()

	const [activeTab, setActiveTab] = useState(0)
	const tabs = [
		{id: 0, title: '一学期', semester: 'sem1'},
		{id: 1, title: '二学期', semester: 'sem2'},
		{id: 2, title: '三学期', semester: 'sem3'},
		{id: 3, title: 'コメント', semester: ''},
	]

	const {register, handleSubmit, reset} = useForm<Scores>({mode: 'all'})

	useEffect(() => {
		if (scores) {
			const {sem1, sem2, sem3} = scores
			const semesters = {sem1, sem2, sem3}
			const subjects = ['japanese', 'arithmetic', 'english', 'social', 'science']
			const newValues: Record<string, number | string> = {}
			;(Object.keys(semesters) as Array<keyof typeof semesters>).forEach((semesterKey) => {
				subjects.forEach((subject) => {
					newValues[`${semesterKey}_mid_${subject}`] = semesters[semesterKey].mid[subject]
					newValues[`${semesterKey}_end_${subject}`] = semesters[semesterKey].end[subject]
				})
			})
			newValues['comments'] = scores.comments
			reset(newValues)
		}
	}, [scores, reset])

	const onSubmit = async (data: Scores) => {
		const formatData = () => {
			const sem1 = {
				end: {},
				mid: {},
			}
			const sem2 = {
				end: {},
				mid: {},
			}
			const sem3 = {
				end: {},
				mid: {},
			}

			const semScores = (prefix: string, semObj: SemObj) => {
				Object.keys(data).forEach((key) => {
					if (key.startsWith(`${prefix}_mid`)) {
						const subjectName = key.split('_').pop()
						if (subjectName) {
							semObj.mid[subjectName] = data[key]
						}
					} else if (key.startsWith(`${prefix}_end`)) {
						const subjectName = key.split('_').pop()
						if (subjectName) {
							semObj.end[subjectName] = data[key]
						}
					}
				})
			}

			semScores('sem1', sem1)
			semScores('sem2', sem2)
			semScores('sem3', sem3)

			return {sem1, sem2, sem3}
		}
		const formattedData = formatData()

		try {
			const res = await fetch(`/api/students/${id}/${year}/scores`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					student_id: id,
					year: year,
					sem1: formattedData.sem1,
					sem2: formattedData.sem2,
					sem3: formattedData.sem3,
					comments: data.comments,
				}),
			})
			if (res.ok) {
				setSuccessForm(true)
				setTimeout(() => {
					setSuccessForm(false)
				}, 4000)
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
		} catch {
			setErrorForm(() => ({
				flag: true,
				message: '通信エラーが発生しました。もう一度お試しください。',
			}))
			setTimeout(() => {
				setErrorForm(() => ({
					flag: false,
					message: '',
				}))
			}, 4000)
		}
	}

	const handleReport = () => {
		router.push('./report')
	}

	if (loading || !scores) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header params={params} name={scores.students.name} />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">成績登録</h2>
					<nav>
						<ul className="grid grid-flow-col text-center text-gray-700 bg-gray-100 rounded-lg p-2 mb-5">
							{tabs.map((tab) => (
								<li
									key={tab.id}
									className={`tab-item flex justify-center py-2 cursor-pointer ${activeTab === tab.id ? 'bg-white rounded-lg shadow font-bold active' : ''}`}
									onClick={() => setActiveTab(tab.id)}
								>
									{tab.title}
								</li>
							))}
						</ul>
					</nav>
					<h3 className="mb-2 text-lg font-bold tracking-tight">
						{scores.students.name}さん（{scores.year}年度）
					</h3>
					<form onSubmit={handleSubmit(onSubmit)} className="">
						{tabs.map((tab) => (
							<section key={tab.id} className={`tab-pane ${activeTab === tab.id ? 'block' : 'hidden'} scoresForm `}>
								{tab.id !== 3 ? (
									<>
										<p className="text-right text-xs mb-2">※成績は半角数字</p>
										<div className="max-w-80 mx-auto">
											<Semester semester={tab.semester} register={register} scores={scores} />
										</div>
									</>
								) : (
									<TextAreaItem register={register} name="comments" />
								)}
							</section>
						))}
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mt-10 mb-5">
							<ButtonItem type="submit" text="保存" style="primary" />
							<ButtonItem type="button" text="レポート" style="outline" onClick={handleReport} />
						</p>
					</form>
					<p>
						<Link href="/students" className="ico-back text-sm text-gray-700 flex justiry-center items-center">
							生徒一覧
						</Link>
					</p>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Scores
