'use client'

import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
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

const EditStudent = ({params}) => {
	const [student, setStudent] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)
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

	const onSubmit = async (data) => {
		await fetch(`/api/students/${id}`, {
			method: 'PUT',
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
				router.push('/students')
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
			}
		}
	}

	if (loading) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">生徒情報編集</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<form onSubmit={handleSubmit(onSubmit)} className="max-w-80 mx-auto" noValidate="novalidate">
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
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mx-auto mt-10">
							<ButtonItem type="submit" text="保存" style="primary" />
							<ButtonItem type="button" text="生徒削除" onClick={handleDelete} style="delete" />
						</p>
					</form>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default EditStudent
