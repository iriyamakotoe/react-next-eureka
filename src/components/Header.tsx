'use client'

import {supabase} from '@/utils/supabase'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

export const Header = () => {
	const [error, setError] = useState(null)
	const router = useRouter()

	const handleLogout = async () => {
		const {error} = await supabase.auth.signOut()

		if (error) {
			setError('ログアウト中にエラーが発生しました。')
			return
		}

		router.push('/login')
	}

	if (error) return <p>エラーが発生しました: {error}</p>

	return (
		<>
			<header className="flex justify-between p-5">
				<h1>ユリイカ学習塾</h1>
				<p>
					<button onClick={handleLogout}>ログアウト</button>
				</p>
			</header>
		</>
	)
}
