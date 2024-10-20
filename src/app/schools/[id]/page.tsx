'use client'

import useFetchSchools from '../../hooks/useFetchSchools'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {InputItem} from '@/components/InputItem'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorForm} from '@/components/ErrorForm'
import {ErrorFetch} from '@/components/ErrorFetch'
import {SuccessForm} from '@/components/SuccessForm'
import Link from 'next/link'

interface School {
	name: string
	school: string
	grade: number
	note: string
}

const EditSchool = ({params}: {params: {[key: string]: string}}) => {
	const {id} = params
	const {schools, loading, error} = useFetchSchools(id)

	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm<School>({mode: 'all'})

	useEffect(() => {
		if (schools) {
			reset({
				name: schools.name,
			})
		}
	}, [schools, reset])

	const onSubmit = async (data: School) => {
		try {
			const res = await fetch(`/api/schools/${id}`, {
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
			const res = await fetch(`/api/schools/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (res.ok) {
				router.push('/schools')
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

	if (loading || !schools) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header params={params} name={schools.name} />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">生徒情報編集</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="max-w-80 mx-auto" noValidate>
						<InputItem register={register} type="text" name="name" label="名前" required={true} errors={errors.name} />

						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mx-auto mt-10 mb-5">
							<ButtonItem type="submit" text="保存" style="primary" />
							<ButtonItem type="button" text="生徒削除" onClick={handleDelete} style="delete" />
						</p>
					</form>
					<p>
						<Link href="/schools" className="ico-back text-sm text-gray-700 flex justiry-center items-center">
							学校一覧
						</Link>
					</p>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default EditSchool
