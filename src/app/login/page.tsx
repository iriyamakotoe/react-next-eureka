'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {InputItem} from '@/components/InputItem'
import {ButtonItem} from '@/components/ButtonItem'
import {ErrorForm} from '@/components/ErrorForm'

interface Login {
	email: string
	password: string
}

const Login = () => {
	const [errorForm, setErrorForm] = useState({flag: false, message: ''})
	const router = useRouter()

	const {register, handleSubmit} = useForm<Login>({mode: 'all'})

	const handleLogin = async (data: Login) => {
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: data.email,
					password: data.password,
				}),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.message)
			}
			router.push('/students')
		} catch (err: unknown) {
			if (err instanceof Error) {
				if (err.message === 'Invalid credentials') {
					setErrorForm(() => ({
						flag: true,
						message: 'メールアドレスまたはパスワードが間違っています。',
					}))
				} else {
					setErrorForm(() => ({
						flag: true,
						message: 'ログイン中にエラーが発生しました。',
					}))
				}
				setTimeout(() => {
					setErrorForm(() => ({
						flag: false,
						message: '',
					}))
				}, 4000)
			}
		}
	}

	return (
		<>
			<Header page="login" />
			<main className="mainWrapper pl-5 pr-5 pb-10">
				<section className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full mb-5 p-5 sm:p-10 sm:pt-8">
					<h2 className="pageTitle">ログイン</h2>
					<form onSubmit={handleSubmit(handleLogin)} noValidate className="loginForm max-w-80 mx-auto">
						<InputItem register={register} type="email" name="email" placeholder="メールアドレス" />
						<InputItem register={register} type="password" name="password" placeholder="パスワード" />
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
