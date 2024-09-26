import {supabase} from '@/utils/supabase'

export async function POST(req) {
	const {name, school, grade, note} = await req.json()

	// Supabaseにデータを送信
	const {error} = await supabase.from('students').insert([{name, school, grade, note}])

	if (error) {
		return new Response(JSON.stringify({error: error.message}), {status: 500})
	}

	return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
}

export async function GET ( req ) {  
	const { data, error } = await supabase
	  .from('students')
	  .select('*')
  
	if (error) {
	  return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
  
	return new Response(JSON.stringify(data), { status: 200 });
  }