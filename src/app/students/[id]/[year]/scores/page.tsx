'use client'

import React, {useState, useEffect} from 'react'
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

const Scores = ({params}) => {
	const [scores, setScores] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)
	const router = useRouter()
	const [activeTab, setActiveTab] = useState(0)

	const {year, id} = params

	useEffect(() => {
		if (!scores) {
			fetchScores()
		}
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

	const tabs = [
		{id: 0, title: '一学期', semester: 'sem1'},
		{id: 1, title: '二学期', semester: 'sem2'},
		{id: 2, title: '三学期', semester: 'sem3'},
		{id: 3, title: 'コメント'},
	]
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({mode: 'all'})

	const onSubmit = async (data) => {
		console.log(data)

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

			const semScores = (prefix, scoreObj) => {
				Object.keys(data).forEach((key) => {
					if (key.startsWith(`${prefix}_mid`)) {
						const subjectName = key.split('_').pop() // 科目名を取得
						scoreObj.mid[subjectName] = data[key] // mid にスコアを追加
					} else if (key.startsWith(`${prefix}_end`)) {
						const subjectName = key.split('_').pop() // 科目名を取得
						scoreObj.end[subjectName] = data[key] // end にスコアを追加
					}
				})
			}

			// スコアオブジェクトを渡す
			semScores('sem1', sem1)
			semScores('sem2', sem2)
			semScores('sem3', sem3)

			return {sem1, sem2, sem3}
		}
		const formattedData = formatData(data)

		await fetch(`/api/students/${id}/${year}/scores`, {
			method: 'PUT',
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
			.then(async (res) => {
				if (res.ok) {
					setSuccessForm(true)
					setTimeout(() => {
						setSuccessForm(false)
					}, 3000)
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
			})
			.catch((error) => {
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
			})
	}

	const handleReport = () => {
		router.push('./report')
	}

	if (loading) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header params={params} name={scores.students.name} />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">成績登録</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<nav>
						<ul className="grid grid-flow-col text-center text-gray-800 bg-gray-100 rounded-lg p-2 mb-5">
							{tabs.map((tab) => (
								<li
									key={tab.id}
									className={`tab-item lex justify-center py-2 ${activeTab === tab.id ? 'bg-white rounded-lg shadow font-bold active' : ''}`}
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
										<p className="text-right text-xs mb-2">※成績は半角数字で記入してください</p>
										<div className="max-w-80 mx-auto">
											<Semester semester={tab.semester} register={register} scores={scores} />
										</div>
									</>
								) : (
									<TextAreaItem register={register} type="text" id="comments" defaultValues={scores.comments} />
								)}
							</section>
						))}
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mt-10">
							<ButtonItem type="submit" text="保存" style="primary" />
							<ButtonItem type="button" text="レポート" style="outline" onClick={handleReport} />
						</p>
					</form>
					<p>
						<Link href="/students" className="flex justiry-center items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
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
