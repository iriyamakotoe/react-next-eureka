import {supabase} from '@/utils/supabase'
import {authenticate} from '../auth'

// GETメソッド
export async function GET(req: Request) {
	const {error} = await authenticate(req)

	if (error) {
		return new Response(JSON.stringify({message: error}), {status: 401})
	}

	try {
		const {data: students, error: studentsError} = await supabase.from('students').select('*')

		if (studentsError) {
			return new Response(JSON.stringify({message: 'Failed to fetch students'}), {status: 500})
		}

		return new Response(JSON.stringify(students), {status: 200})
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

	const {name, school, grade, note} = await req.json()

	try {
		const {error: insertError} = await supabase.from('students').insert([{name, school, grade, note}])

		if (insertError) {
			if (insertError.code === '23505') {
				return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
			}
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
