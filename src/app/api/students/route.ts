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
		const {data: studentData, error: insertError} = await supabase
			.from('students')
			.insert([{name, school, grade, note}])
			.select()

		if (insertError) {
			if (insertError.code === '23505') {
				return new Response(JSON.stringify({message: 'この名前はすでに使用されています。'}), {status: 400})
			}
			return new Response(JSON.stringify({message: '登録中にエラーが発生しました。'}), {status: 500})
		}

		// 作成した生徒ID
		const studentId = studentData[0].id
		// 年度を算出
		const today = new Date()
		const year = today.getFullYear()
		const month = today.getMonth() + 1
		const fiscalYear = month >= 4 ? year : year - 1

		const {error: scoreError} = await supabase.from('scores').insert([
			{
				student_id: studentId,
				year: fiscalYear,
				sem1: {mid: '', end: ''},
				sem2: {mid: '', end: ''},
				sem3: {mid: '', end: ''},
				comments: null,
			},
		])

		if (scoreError) {
			console.error('Error inserting into scores table:', scoreError)

			await supabase.from('students').delete().eq('id', studentId)

			return {success: false, message: 'Error inserting score, rolled back student.'}
		}

		return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
