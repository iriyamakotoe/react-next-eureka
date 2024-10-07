'use client'

import useFetchStudents from '../../hooks/useFetchStudents'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {InputItem} from '@/components/InputItem'
import {TextAreaItem} from '@/components/TextAreaItem'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorForm} from '@/components/ErrorForm'
import {ErrorFetch} from '@/components/ErrorFetch'
import {SuccessForm} from '@/components/SuccessForm'
import Link from 'next/link'

interface Student {
	name: string
	school: string
	grade: number
	note: string
}

const NewStudent = () => {
	const {students, loading, error} = useFetchStudents(null)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm<Student>({mode: 'all'})

	useEffect(() => {
		if (students) {
			reset({})
		}
	}, [students, reset])

	const onSubmit = async (data: Student) => {
		try {
			const res = await fetch('/api/students', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
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
					message: data.message || '不明なエラーが発生しました。',
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

	if (loading || !students) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">新規生徒登録</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-80 mx-auto">
						<InputItem register={register} type="text" name="name" label="名前" required={true} errors={errors.name} />
						<InputItem register={register} type="text" name="school" label="学校" />
						<InputItem
							register={register}
							type="number"
							name="grade"
							label="学年"
							pattern={{
								value: /^[1-3]*$/,
								message: '半角数字(1-3)で入力してください。',
							}}
							errors={errors.grade}
							suffix="年生"
						/>
						<TextAreaItem register={register} name="note" label="メモ" />

						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mt-10">
							<ButtonItem type="submit" text="登録" style="primary" />
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

export default NewStudent
