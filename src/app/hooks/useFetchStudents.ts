import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/navigation'

interface Student {
	name: string
	school: string
	grade: number
	note: string
}

const useFetchStudents = (id: string | null) => {
	const [students, setStudents] = useState<Student | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const fetchStudents = useCallback(async () => {
		try {
			const res = await fetch(id ? `/api/students/${id}` : '/api/students', {
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
			setStudents(data)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			}
		} finally {
			setLoading(false)
		}
	}, [id])

	useEffect(() => {
		fetchStudents()
	}, [fetchStudents])

	return {students, loading, error}
}

export default useFetchStudents
