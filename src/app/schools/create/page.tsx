'use client'

import useFetchSchools from '../../hooks/useFetchSchools'
import {useEffect, useState} from 'react'
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
}

const NewSchool = () => {
	const {schools, loading, error} = useFetchSchools(null)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm<School>({mode: 'all'})

	useEffect(() => {
		if (schools) {
			reset({})
		}
	}, [schools, reset])

	const onSubmit = async (data: School) => {
		try {
			const res = await fetch('/api/schools', {
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

	if (loading || !schools) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">新規学校登録</h2>
					<form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-80 mx-auto">
						<InputItem register={register} type="text" name="name" label="学校" required={true} errors={errors.name} />

						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mt-10 mb-5">
							<ButtonItem type="submit" text="登録" style="primary" />
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

export default NewSchool
