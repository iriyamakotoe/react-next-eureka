import {supabase} from '@/utils/supabase'
import {authenticate} from '../auth'

// GETメソッド
export async function GET(req: Request) {
	const {error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	try {
		const {data: schools, error: schoolsError} = await supabase.from('schools').select('*')

		if (schoolsError) {
			return new Response(JSON.stringify({message: 'Failed to fetch schools'}), {status: 500})
		}

		return new Response(JSON.stringify(schools), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}

// POSTメソッド
export async function POST(req: Request) {
	const {error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	const {name} = await req.json()

	try {
		const {error: insertError} = await supabase.from('schools').insert([{name}]).select()

		if (insertError) {
			if (insertError.code === '23505') {
				return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
			}
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'School added successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
