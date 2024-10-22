'use client'

import useFetchSheets from '../../../../../hooks/useFetchSheets'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {Loading} from '@/components/Loading'
import {SemSheets} from '@/components/SemSheets'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorFetch} from '@/components/ErrorFetch'
import {ErrorForm} from '@/components/ErrorForm'
import {SuccessForm} from '@/components/SuccessForm'
import Link from 'next/link'

interface Sheets {
	school_id: number
	year: number
	grade: number
	schools: {
		name: string
		id: number
	}
}
type FormData = {
	[key: string]: File[]
}

interface Tab {
	id: number
	title: string
	semester: 'sem1' | 'sem2' | 'sem3'
}

const Sheets = ({params}: {params: {[key: string]: string}}) => {
	const {id, year, grade} = params
	const {sheets, loading, error, refetch} = useFetchSheets(id, year, grade)
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const [successForm, setSuccessForm] = useState(false)
	const router = useRouter()

	const [activeTab, setActiveTab] = useState(0)
	const tabs: Tab[] = [
		{id: 0, title: '一学期', semester: 'sem1'},
		{id: 1, title: '二学期', semester: 'sem2'},
		{id: 2, title: '三学期', semester: 'sem3'},
	]

	useEffect(() => {
		if (sheets) {
			console.log('画像が更新されました')
		}
	}, [sheets])

	const {register, handleSubmit} = useForm<FormData>({mode: 'all'})

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const urls: {[key: string]: string} = {}
		const uploadPromises: Promise<void>[] = []
		for (const key in data) {
			const files = data[key]
			if (files[0]) {
				console.log(files[0])
				const formData = new FormData()
				formData.append('file', files[0])
				formData.append('upload_preset', 'ml_default')
				// アップロード処理をPromiseとして保持
				const uploadPromise = fetch(
					`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
					{
						method: 'POST',
						body: formData,
					},
				)
					.then(async (res) => {
						if (!res.ok) {
							const errorData = await res.json()
							throw new Error(errorData.message || 'Upload failed')
						}
						const responseData = await res.json()
						urls[key] = responseData.secure_url
					})
					.catch((error) => {
						console.error('Error uploading image:', error)
						throw error
					})
				uploadPromises.push(uploadPromise)
			}
		}

		try {
			await Promise.all(uploadPromises)
			console.log('すべての画像がアップロードされました:', urls)
			const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(urls),
			})
			if (res.ok) {
				setSuccessForm(true)
				setTimeout(() => {
					setSuccessForm(false)
				}, 4000)
				await refetch()
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

	// const handleReport = () => {
	// 	router.push('./report')
	// }

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleSheets(id, year, e.target.value)
	}

	const handleSheets = async (id: string, year: string, grade: string) => {
		const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
			method: 'GET',
			credentials: 'include',
		})
		if (res.ok) {
			router.push(`/schools/${id}/${year}/${grade}/sheets`)
		} else {
			createSheet(id, year, grade)
		}
	}

	const createSheet = async (id: string, year: string, grade: string) => {
		const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				school_id: id,
				year: year,
				grade: grade,
			}),
		})
		if (res.ok) {
			router.push(`/schools/${id}/${year}/${grade}/sheets`)
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
	}
	const handleDelete = async (inputName: string) => {
		const confirmDelete = window.confirm('画像を本当に削除しますか？')
		if (confirmDelete) {
			const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					[inputName]: null,
				}),
			})
			if (res.ok) {
				await refetch()
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

	if (loading || !sheets) return <Loading />
	if (error) return <ErrorFetch message={error} />

	return (
		<>
			<Header page="schools" params={params} name={sheets.schools.name} />
			<main className="mainWrapper px-3 sm:px-5">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">答案用紙登録</h2>
					<nav>
						<ul className="grid grid-flow-col text-center text-gray-700 bg-gray-100 rounded-lg p-2 mb-5">
							{tabs.map((tab) => (
								<li
									key={tab.id}
									className={`tab-item flex justify-center py-2 cursor-pointer ${activeTab === tab.id ? 'bg-white rounded-lg shadow font-bold active' : ''}`}
									onClick={() => setActiveTab(tab.id)}
								>
									{tab.title}
								</li>
							))}
						</ul>
					</nav>
					<h3 className="mb-2 text-lg font-bold tracking-tight">
						{sheets.schools.name}（{sheets.year}年度）{' '}
						<select
							name="grade"
							id="grade"
							value={grade}
							onChange={handleSelect}
							className="rounded py-1.5 px-2 mr-2 inline-block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
						年生
					</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						{tabs.map((tab) => (
							<section key={tab.id} className={`tab-pane ${activeTab === tab.id ? 'block' : 'hidden'} sheetsForm `}>
								<div className="max-w-xl mx-auto">
									<SemSheets semester={tab.semester} register={register} sheets={sheets} onAction={handleDelete} />
								</div>
							</section>
						))}
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						{successForm && <SuccessForm message="登録しました。" />}
						<p className="flex justify-center mt-10 mb-5">
							<ButtonItem type="submit" text="保存" style="primary" />
							{/* <ButtonItem type="button" text="レポート" style="outline" onClick={handleReport} /> */}
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

export default Sheets
