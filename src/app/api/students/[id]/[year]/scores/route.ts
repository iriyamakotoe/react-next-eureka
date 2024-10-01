import {supabase} from '@/utils/supabase'
import {authenticate} from '../../../../auth'

// GETメソッド: 学生IDと年度に基づいてスコアを取得
export async function GET(req, {params}) {
	const {user, error: authError} = await authenticate(req)

	// 認証に失敗した場合
	if (authError) {
		return new Response(JSON.stringify({message: authError}), {status: 401})
	}

	const {year, id} = params

	try {
		const {data, error} = await supabase
			.from('scores')
			.select('*, students(name)')
			.eq('student_id', id)
			.eq('year', year)
			.single()

		if (error) {
			console.error('Error fetching data:', error)
			return new Response(JSON.stringify({message: error.message}), {status: 500})
		}

		return new Response(JSON.stringify(data), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// POSTメソッド: 新しいスコアを登録
export async function POST(req, {params}) {
	const {user, error: authError} = await authenticate(req)

	// 認証に失敗した場合
	if (authError) {
		return new Response(JSON.stringify({message: authError}), {status: 401})
	}

	const {student_id, year, sem1, sem2, sem3, comments} = await req.json()

	try {
		const {error} = await supabase.from('scores').insert([{student_id, year, sem1, sem2, sem3, comments}])

		if (error) {
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student Score added successfully'}), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// PUTメソッド: 既存のスコアを更新
export async function PUT(req, {params}) {
	const {user, error: authError} = await authenticate(req)

	// 認証に失敗した場合
	if (authError) {
		return new Response(JSON.stringify({message: authError}), {status: 401})
	}

	const {student_id, year, sem1, sem2, sem3, comments} = await req.json()

	try {
		const {error} = await supabase
			.from('scores')
			.update({sem1, sem2, sem3, comments})
			.eq('student_id', student_id)
			.eq('year', year)

		if (error) {
			return new Response(JSON.stringify({message: '更新中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student Score updated successfully'}), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
