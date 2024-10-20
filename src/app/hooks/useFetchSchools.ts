import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/navigation'

interface School {
	id: number
	name: string
}

const useFetchSchools = (id: string | null) => {
	const [schools, setSchools] = useState<School | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const fetchSchools = useCallback(async () => {
		try {
			const res = await fetch(id ? `/api/schools/${id}` : '/api/schools', {
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
			setSchools(data)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			}
		} finally {
			setLoading(false)
		}
	}, [id, router])

	useEffect(() => {
		fetchSchools()
	}, [fetchSchools])

	return {schools, loading, error}
}

export default useFetchSchools
