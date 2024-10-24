import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/navigation'

type semObj = {
	mid: {[key: string]: number}
	end: {[key: string]: number}
}

interface Scores {
	student_id: number
	year: number
	sem1: semObj
	sem2: semObj
	sem3: semObj
	comments: string
	students: {name: string; id: number}
}

const useFetchScores = (id: string, year: string) => {
	const [scores, setScores] = useState<Scores | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const fetchScores = useCallback(async () => {
		try {
			const res = await fetch(`/api/students/${id}/${year}/scores`, {
				method: 'GET',
				credentials: 'include',
			})
			if (res.status === 401) {
				router.push('/login')
				return
			}
			if (!res.ok) {
				throw new Error('データの取得に失敗しました')
			}
			const data = await res.json()
			setScores(data)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			}
		} finally {
			setLoading(false)
		}
	}, [id, router, year])

	useEffect(() => {
		fetchScores()
	}, [fetchScores])

	return {scores, loading, error}
}

export default useFetchScores
