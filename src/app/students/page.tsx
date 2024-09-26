'use client'

import React, {useState} from 'react'
// import {useCookies} from 'react-cookie'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {InputItem} from '@/components/InputItem'
import {TextAreaItem} from '@/components/TextAreaItem'
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

	return (
		<>
			<Header />
			<main>
				<h2 className="page-title">新規生徒登録</h2>
				<form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
					<InputItem register={register} type="text" id="name" label="名前" required={true} pattern={{}} errors={errors.name} />
					<InputItem register={register} type="text" id="school" label="学校" pattern={{}} errors={errors.school} />
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
					/>

					<TextAreaItem register={register} type="text" id="note" label="メモ" pattern={{}} errors={errors.note} />
					<p className="flex justify-center mt-10">
						<button type="submit">送信</button>
					</p>
					<p className="error form-error mt-5 text-center">{errorMessage}</p>
					{successMessage && <p className="success bg-orange-50 text-orange-600 mb-10 p-3">生徒が正常に追加されました。</p>}
				</form>
			</main>
		</>
	)
}

export default NewStudent
