'use client'

import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {InputItem} from '@/components/InputItem'
import {TextAreaItem} from '@/components/TextAreaItem'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorForm} from '@/components/ErrorForm'
import {SuccessForm} from '@/components/SuccessForm'

const NewStudent = () => {
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({mode: 'all'})

	const onSubmit = async (data) => {
		await fetch('/api/students', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
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
			.catch(() => {
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

	return (
		<>
			<Header />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">新規生徒登録</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate" className="max-w-80 mx-auto">
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
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mt-10">
							<ButtonItem type="submit" text="登録" style="primary" />
						</p>
					</form>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default NewStudent
