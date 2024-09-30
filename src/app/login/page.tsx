'use client'

import {supabase} from '@/utils/supabase'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {InputItem} from '@/components/InputItem'
import {ButtonItem} from '@/components/ButtonItem'
import {errorForm} from '@/components/errorForm'

const Login = () => {
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({mode: 'all'})

	const handleLogin = async (formData) => {
		console.log(formData)

		const {data, error} = await supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		})

		if (error) {
			switch (error.code) {
				case 'invalid_credentials':
					setErrorForm(() => ({
						flag: true,
						message: 'メールアドレスまたはパスワードが間違っています。',
					}))
					setTimeout(() => {
						setErrorForm(() => ({
							flag: false,
							message: '',
						}))
					}, 4000)
					break
				default:
					setErrorForm(() => ({
						flag: true,
						message: 'ログイン中にエラーが発生しました。',
					}))
					setTimeout(() => {
						setErrorForm(() => ({
							flag: false,
							message: '',
						}))
					}, 4000)
					break
			}
			return
		}

		router.push('/students')
	}

	return (
		<>
			<Header />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<h2 className="pageTitle">ログイン</h2>
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10">
					<form onSubmit={handleSubmit(handleLogin)} noValidate="novalidate" className="loginForm max-w-80 mx-auto">
						<InputItem
							register={register}
							type="email"
							id="email"
							pattern={{}}
							errors={errors.email}
							placeholder="メールアドレス"
						/>
						<InputItem
							register={register}
							type="password"
							id="password"
							pattern={{}}
							errors={errors.password}
							placeholder="パスワード"
						/>
						{errorForm.flag && <ErrorForm message={errorForm.message} />}
						<p className="flex justify-center mt-10">
							<ButtonItem type="submit" text="ログイン" style="primary" />
						</p>
					</form>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Login
