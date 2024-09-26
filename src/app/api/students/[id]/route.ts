import {supabase} from '@/utils/supabase'

export async function GET ( req, { params } ) {
	const { id } = params;  // URLパラメータからIDを取得
  
	// Supabaseから特定のIDのデータを取得
	const { data, error } = await supabase
	  .from('students')
	  .select('*')
	  .eq('id', id)
	  .single(); // 1つのレコードを取得する場合は `single()` を使用
  
	if (error) {
	  return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
  
	return new Response(JSON.stringify(data), { status: 200 });
  }


  export async function PUT(req, { params }) {
	const {name, school, grade, note} = await req.json()
	const { id } = params;  // URLパラメータからIDを取得

	// Supabaseにデータを送信
	const {error} = await supabase
	.from('students')
	.update({ name, school, grade, note })  // 更新データを指定
    .eq('id', id);  // 特定のIDをもとにデータを更新

	if (error) {
		return new Response(JSON.stringify({error: error.message}), {status: 500})
	}

	return new Response(JSON.stringify({message: 'Student added successfully'}), {status: 200})
}

export async function DELETE(req, { params }) {
	try {
	  const { id } = params;  // URLパラメータからIDを取得
  
	  // Supabaseでデータを削除
	  const { error } = await supabase
		.from('students')
		.delete()
		.eq('id', id); // IDに基づいて削除
  
	  if (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	  }
  
	  return new Response(JSON.stringify({ message: 'Student deleted successfully' }), { status: 200 });
	} catch (err) {
	  return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
	}
  }