import {supabase} from '@/utils/supabase'
import {authenticate} from '../../auth'

// GETメソッド: 特定のIDのstudent情報を取得
export async function GET(req, {params}) {
	const {user, error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {id} = params

	try {
		// Supabaseから特定のIDのデータを取得
		const {data, error} = await supabase.from('students').select('*').eq('id', id).single()

		if (error) {
			return new Response(JSON.stringify({message: error.message}), {status: 500})
		}

		return new Response(JSON.stringify(data), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// PUTメソッド: 特定のIDのstudent情報を更新
export async function PUT(req, {params}) {
	const {user, error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {id} = params
	const {name, school, grade, note} = await req.json()

	try {
		const {error} = await supabase.from('students').update({name, school, grade, note}).eq('id', id)

		if (error) {
			// ユニーク制約エラーの場合の処理
			if (error.code === '23505') {
				return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
			}
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student updated successfully'}), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// DELETEメソッド: 特定のIDのstudent情報を削除
export async function DELETE(req, {params}) {
	const {user, error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {id} = params

	try {
		const {error} = await supabase.from('students').delete().eq('id', id)

		if (error) {
			return new Response(JSON.stringify({message: error.message}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student deleted successfully'}), {status: 200})
	} catch (err) {
		return new Response(JSON.stringify({message: 'Invalid request'}), {status: 400})
	}
}
