import {supabase} from '@/utils/supabase'
import {authenticate} from '../../auth'

// GETメソッド: 特定のIDのschool情報を取得
export async function GET(req: Request, {params}: {params: {[key: string]: string | string[]}}) {
	const {error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {id} = params

	try {
		const {data, error} = await supabase.from('schools').select('*').eq('id', id).single()

		if (error) {
			return new Response(JSON.stringify({message: error.message}), {status: 500})
		}

		return new Response(JSON.stringify(data), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// PUTメソッド: 特定のIDのschool情報を更新
export async function PUT(req: Request, {params}: {params: {[key: string]: string | string[]}}) {
	const {error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {id} = params
	const {name, school, grade, note} = await req.json()

	try {
		const {error} = await supabase.from('schools').update({name, school, grade, note}).eq('id', id)

		if (error) {
			// ユニーク制約エラーの場合の処理
			if (error.code === '23505') {
				return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
			}
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'School updated successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// DELETEメソッド: 特定のIDのschool情報を削除
export async function DELETE(req: Request, {params}: {params: {[key: string]: string | string[]}}) {
	const {error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {id} = params

	try {
		const {error} = await supabase.from('schools').delete().eq('id', id)

		if (error) {
			return new Response(JSON.stringify({message: error.message}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'School deleted successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Invalid request'}), {status: 400})
	}
}
