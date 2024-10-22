import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/navigation'

interface SubjectSheets {
	japanese: string
	arithmetic: string
	english: string
	social: string
	science: string
}

interface Sheets {
	school_id: number
	year: number
	grade: number
	sem1_mid?: SubjectSheets
	sem1_end?: SubjectSheets
	sem2_mid?: SubjectSheets
	sem2_end?: SubjectSheets
	sem3_mid?: SubjectSheets
	sem3_end?: SubjectSheets
	schools: {
		name: string
		id: number
	}
}

const useFetchSheets = (id: string, year: string, grade: string) => {
	const [sheets, setSheets] = useState<Sheets | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const fetchSheets = useCallback(async () => {
		try {
			const res = await fetch(`/api/schools/${id}/${year}/${grade}/sheets`, {
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
			setSheets(data)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			}
		} finally {
			setLoading(false)
		}
	}, [id, router, year, grade])

	useEffect(() => {
		fetchSheets()
	}, [fetchSheets])

	return {sheets, loading, error, refetch: fetchSheets}
}

export default useFetchSheets
