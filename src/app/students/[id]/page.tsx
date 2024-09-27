'use client'

import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {InputItem} from '@/components/InputItem'
import {TextAreaItem} from '@/components/TextAreaItem'

const EditStudent = ({params}) => {
	const [student, setStudent] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()

	const {id} = params // ルートからIDを取得

	useEffect(() => {
		fetchStudent()
	}, [])

	const fetchStudent = async () => {
		try {
			const res = await fetch(`/api/students/${id}`)
			if (!res.ok) {
				throw new Error('データの取得に失敗しました')
			}
			const data = await res.json()
			setStudent(data)
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
		await fetch(`/api/students/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
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

	const handleDelete = async () => {
		const confirmDelete = window.confirm('本当に削除しますか？この操作は元に戻せません。')
		if (confirmDelete) {
			const res = await fetch(`/api/students/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(),
			})
			if (res.ok) {
				router.push('/')
			} else {
				const data = await res.json()
				setErrorMessage(data.message)
			}
		}
	}

	if (loading) return <p>読み込み中...</p>
	if (error) return <p>エラーが発生しました: {error}</p>

	return (
		<>
			<Header />
			<main>
				<h2 className="page-title">生徒情報編集</h2>
				<form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
					<InputItem
						register={register}
						type="text"
						id="name"
						label="名前"
						required={true}
						pattern={{}}
						errors={errors.name}
						defaultValues={student.name}
					/>

					<InputItem
						register={register}
						type="text"
						id="school"
						label="学校"
						pattern={{}}
						errors={errors.school}
						defaultValues={student.school}
					/>

					<InputItem
						register={register}
						type="number"
						id="grade"
						label="学年"
						pattern={{
							value: /^[0-9]*$/,
							message: '半角数字で入力してください。',
						}}
						errors={errors.grade}
						suffix="年生"
						defaultValues={student.grade}
					/>

					<TextAreaItem
						register={register}
						type="text"
						id="note"
						label="メモ"
						pattern={{}}
						errors={errors.note}
						defaultValues={student.note}
					/>

					<p className="flex justify-center mt-10">
						<button type="submit">送信</button>
						<button type="button" onClick={handleDelete}>
							削除
						</button>
					</p>
					<p className="error form-error mt-5 text-center">{errorMessage}</p>

					{successMessage && <p className="success bg-orange-50 text-orange-600 mb-10 p-3">登録しました！</p>}
				</form>
			</main>
		</>
	)
}

export default EditStudent
