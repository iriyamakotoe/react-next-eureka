import {supabase} from '@/utils/supabase'
import {authenticate} from '../../../../../auth'

// GETメソッド: 学校IDと年度、学年に基づいて答案用紙を取得
export async function GET(req: Request, {params}: {params: {[key: string]: string | string[]}}) {
	const {error: authError} = await authenticate(req)

	// 認証に失敗した場合
	if (authError) {
		return new Response(JSON.stringify({message: authError}), {status: 401})
	}

	const {grade, year, id} = params

	try {
		const {data, error} = await supabase
			.from('sheets')
			.select('*, schools(name)')
			.eq('school_id', id)
			.eq('year', year)
			.eq('grade', grade)
			.single()

		if (error) {
			console.error('Error fetching data:', error)
			return new Response(JSON.stringify({message: error.message}), {status: 500})
		}

		return new Response(JSON.stringify(data), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// POSTメソッド: 新しい答案用紙を登録
export async function POST(req: Request) {
	const {error: authError} = await authenticate(req)

	// 認証に失敗した場合
	if (authError) {
		return new Response(JSON.stringify({message: authError}), {status: 401})
	}

	const {school_id, year, grade} = await req.json()

	try {
		const {error} = await supabase.from('sheets').insert([{school_id, year, grade}])

		if (error) {
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student Score added successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// PUTメソッド: 既存の答案用紙を更新
export async function PUT(req: Request, {params}: {params: {[key: string]: string | string[]}}) {
	const {error: authError} = await authenticate(req)

	// 認証に失敗した場合
	if (authError) {
		return new Response(JSON.stringify({message: authError}), {status: 401})
	}

	const {grade, year, id} = params

	const {...semSheets} = await req.json()

	try {
		const {error} = await supabase.from('sheets').update(semSheets).eq('school_id', id).eq('year', year).eq('grade', grade)

		if (error) {
			return new Response(JSON.stringify({message: '更新中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student Score updated successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
