'use client'

import React, {useState} from 'react'
// import {useCookies} from 'react-cookie'
import {useForm} from 'react-hook-form'
import {Header} from '../../components/Header'
import {InputItem} from '../../components/InputItem'
import {TextAreaItem} from '../../components/TextAreaItem'
// import './newreview.scss'

const NewStudent = () => {
	// const [cookies, ,] = useCookies()

	const defaultValues = {
		name: '',
		school: '',
		grade: '',
		note: '',
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
		await fetch('/api/students', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok) {
				setSuccessMessage(true)
				setTimeout(() => {
					setSuccessMessage(false)
				}, 3000)
			} else {
				setErrorMessage(`エラーが発生しました：${res.status}`)
			}
		})
	}

	return (
		<>
			<Header />
			<main>
				<h2 className="page-title">生徒新規登録</h2>
				<form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
					<InputItem
						register={register}
						type="text"
						id="name"
						label="名前"
						pattern={{}}
						errors={errors.title}
						defaultValues={defaultValues.name}
					/>

					<InputItem
						register={register}
						type="text"
						id="school"
						label="学校"
						pattern={{}}
						errors={errors.url}
						defaultValues={defaultValues.school}
					/>

					<InputItem
						register={register}
						type="text"
						id="grade"
						label="学年"
						pattern={{}}
						errors={errors.detail}
						defaultValues={defaultValues.grade}
					/>

					<TextAreaItem
						register={register}
						type="text"
						id="note"
						label="メモ"
						pattern={{}}
						errors={errors.review}
						defaultValues={defaultValues.note}
					/>

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

export default NewStudent
