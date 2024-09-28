'use client'

import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Semester} from '@/components/Semester'
import {TextAreaItem} from '@/components/TextAreaItem'

const Report = ({params}) => {
	const [scores, setScores] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()

	const {year, id} = params

	useEffect(() => {
		if (!scores) {
			fetchScores()
		}
		console.log(scores)
	}, [scores])

	const fetchScores = async () => {
		console.log('Fetching scores for year:', year) // year の値を確認
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

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({mode: 'all'})

	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState(false)

	const onSubmit = async (data) => {
		setErrorMessage('')
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

		console.log(formattedData)
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
					setSuccessMessage(true)
					setTimeout(() => {
						setSuccessMessage(false)
					}, 3000)
				} else {
					const data = await res.json()
					setErrorMessage(data.message)
					return
				}
			})
			.catch((error) => {
				setErrorMessage('通信エラーが発生しました。もう一度お試しください。')
			})
	}

	if (loading) return <p>読み込み中...</p>
	if (error) return <p>エラーが発生しました: {error}</p>

	return (
		<>
			<Header />
			<main>
				<h2 className="page-title">{scores.students.name} 成績登録</h2>
				<p>※成績は半角数字</p>
				<nav>
					<ul className="flex">
						<li>
							<a href="#sem1">一学期</a>
						</li>
						<li>
							<a href="#sem2">二学期</a>
						</li>
						<li>
							<a href="#sem3">三学期</a>
						</li>
						<li>
							<a href="#other">コメント</a>
						</li>
					</ul>
				</nav>
				<form onSubmit={handleSubmit(onSubmit)}>
					<section id="sem1">
						<h3>一学期</h3>
						<Semester semster="sem1" register={register} scores={scores} />
					</section>
					<section id="sem2">
						<h3>二学期</h3>
						<Semester semster="sem2" register={register} scores={scores} />
					</section>
					<section id="sem3">
						<h3>三学期</h3>
						<Semester semster="sem3" register={register} scores={scores} />
					</section>
					<section id="other">
						<h3>コメント</h3>
						<TextAreaItem register={register} type="text" id="comments" label="メモ" defaultValues={scores.comments} />
					</section>
					<p className="flex justify-center mt-10">
						<button type="submit">送信</button>
					</p>
					<p className="error form-error mt-5 text-center">{errorMessage}</p>
					{successMessage && <p className="success bg-orange-50 text-orange-600 mb-10 p-3">登録しました！</p>}
				</form>
			</main>
		</>
	)
}

export default Report
