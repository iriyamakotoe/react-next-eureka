'use client'

import {supabase} from '@/utils/supabase'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Header} from '@/components/Header'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const router = useRouter()

	const handleLogin = async () => {
		const {data, error} = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			switch (error.code) {
				case 'invalid_credentials':
					setError('メールアドレスまたはパスワードが間違っています。')
					break
				default:
					setError('ログイン中にエラーが発生しました。')
					break
			}
			return
		}

		router.push('/')
	}

	return (
		<>
			<Header />
			<main>
				<h2>ログイン</h2>
				<section>
					<p>
						<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</p>
					<p>
						<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</p>
					<p>
						<button onClick={handleLogin}>Login</button>
					</p>
					{error && <p>{error}</p>}
				</section>
			</main>
		</>
	)
}

export default Login
