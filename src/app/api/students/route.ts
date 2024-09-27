import {supabase} from '@/utils/supabase'

export async function GET(req) {
	const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '')

	if (!accessToken) {
		return new Response(JSON.stringify({error: 'Unauthorized'}), {status: 401})
	}

	// サーバーサイドでSupabaseユーザーを取得
	const {
		data: {user},
		error: authError,
	} = await supabase.auth.getUser(accessToken)

	if (authError || !user) {
		return new Response(JSON.stringify({error: 'User not authenticated'}), {status: 401})
	}

	const {data, error} = await supabase.from('students').select('*')

	if (error) {
		return new Response(JSON.stringify({error: error.message}), {status: 500})
	}

	return new Response(JSON.stringify(data), {status: 200})
}

export async function POST(req) {
	const {name, school, grade, note} = await req.json()

	const {error} = await supabase.from('students').insert([{name, school, grade, note}])

	if (error) {
		// ユニーク制約エラーの場合の処理
		if (error.code === '23505') {
			return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
		}

		return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
	}

	return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
}
