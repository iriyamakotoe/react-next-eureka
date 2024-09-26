import {supabase} from '@/utils/supabase'

export async function GET(req, {params}) {
	const {id} = params

	// Supabaseから特定のIDのデータを取得
	const {data, error} = await supabase.from('students').select('*').eq('id', id).single()

	if (error) {
		return new Response(JSON.stringify({error: error.message}), {status: 500})
	}

	return new Response(JSON.stringify(data), {status: 200})
}

export async function PUT(req, {params}) {
	const {id} = params
	const {name, school, grade, note} = await req.json()

	const {error} = await supabase.from('students').update({name, school, grade, note}).eq('id', id)

	if (error) {
		// ユニーク制約エラーの場合の処理
		if (error.code === '23505') {
			return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
		}

		return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
	}

	return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
}

export async function DELETE(req, {params}) {
	const {id} = params
	try {
		const {error} = await supabase.from('students').delete().eq('id', id)

		if (error) {
			return new Response(JSON.stringify({error: error.message}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student deleted successfully'}), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({error: 'Invalid request'}), {status: 400})
	}
}
