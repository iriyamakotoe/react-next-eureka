'use client'

import useFetchStudents from '../../hooks/useFetchStudents'
import {useState} from 'react'
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
import Link from 'next/link'

interface Student {
	name: string
	school: string
	grade: number
	note: string
}

type FormData = Student

const EditStudent = ({params}: {params: {[key: string]: string}}) => {
	const {id} = params
	const {students, loading, error} = useFetchStudents(id)

	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<FormData>({mode: 'all'})

	const onSubmit = async (data: FormData) => {
		try {
			const res = await fetch(`/api/students/${id}`, {
				method: 'PUT',
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

	const handleDelete = async () => {
		const confirmDelete = window.confirm('本当に削除しますか？この操作は元に戻せません。')
		if (confirmDelete) {
			const res = await fetch(`/api/students/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
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

	if (loading || !students) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header params={params} name={students.name} />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">生徒情報編集</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<form onSubmit={handleSubmit(onSubmit)} className="max-w-80 mx-auto" noValidate>
						<InputItem register={register} type="text" name="name" label="名前" required={true} errors={errors} />

						<InputItem register={register} type="text" name="school" label="学校" errors={errors} />

						<InputItem
							register={register}
							type="number"
							name="grade"
							label="学年"
							pattern={{
								value: /^[1-3]*$/,
								message: '半角数字(1-3)で入力してください。',
							}}
							errors={errors}
							suffix="年生"
						/>

						<TextAreaItem register={register} name="note" label="メモ" errors={errors} />
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mx-auto mt-10">
							<ButtonItem type="submit" text="保存" style="primary" />
							<ButtonItem type="button" text="生徒削除" onClick={handleDelete} style="delete" />
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

export default EditStudent
