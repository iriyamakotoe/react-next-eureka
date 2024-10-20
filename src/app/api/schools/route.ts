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
		const {data: schoolData, error: insertError} = await supabase.from('schools').insert([{name}]).select()

		if (insertError) {
			if (insertError.code === '23505') {
				return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
			}
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		// // 作成した生徒ID
		// const schoolId = schoolData[0].id
		// // 年度を算出
		// const today = new Date()
		// const year = today.getFullYear()
		// const month = today.getMonth() + 1
		// const fiscalYear = month >= 4 ? year : year - 1

		// const {error: scoreError} = await supabase.from('sheets').insert([
		// 	{
		// 		school_id: schoolId,
		// 		year: fiscalYear,
		// 		grade: null,
		// 	},
		// ])

		// if (scoreError) {
		// 	console.error('Error inserting into scores table:', scoreError)

		// 	await supabase.from('schools').delete().eq('id', schoolId)
		// 	return new Response(JSON.stringify({message: '答案用紙の登録中にエラーが発生しました。'}), {status: 500})
		// }

		return new Response(JSON.stringify({message: 'School added successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
