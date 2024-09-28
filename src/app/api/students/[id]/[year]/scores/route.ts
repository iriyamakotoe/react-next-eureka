import {supabase} from '@/utils/supabase'

export async function GET(req, {params}) {
	const {year, id} = params

	const {data, error} = await supabase
		.from('scores')
		.select('*, students(name)')
		.eq('student_id', id)
		.eq('year', year)
		.single()

	// エラーハンドリング
	if (error) {
		console.error('Error fetching data:', error)
		return new Response(JSON.stringify({error: error.message}), {status: 500}) // エラーメッセージを含むレスポンスを返す
	}

	// データを含むレスポンスを返す
	return new Response(JSON.stringify(data), {status: 200})
}

export async function POST(req, {params}) {
	const {student_id, year, sem1, sem2, sem3, comments} = await req.json()

	const {error} = await supabase.from('scores').insert([{student_id, year, sem1, sem2, sem3, comments}])

	if (error) {
		return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
	}

	return new Response(JSON.stringify({message: 'Student Score added successfully'}), {status: 200})
}

export async function PUT(req, {params}) {
	const {student_id, year, sem1, sem2, sem3, comments} = await req.json()

	const {error} = await supabase
		.from('scores')
		.update({sem1, sem2, sem3, comments})
		.eq('student_id', student_id)
		.eq('year', year)

	if (error) {
		return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
	}

	return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
}
