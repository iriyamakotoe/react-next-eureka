import {supabase} from '@/utils/supabase'
import {parse} from 'cookie'

// 認証関数
export async function authenticate(req) {
	// リクエストヘッダーからクッキーを取得
	const cookies = parse(req.headers.get('cookie') || '')
	const token = cookies.supabaseToken

	// クッキーにトークンが存在しない場合、認証エラーを返す
	if (!token) {
		return {user: null, error: 'Unauthorized'}
	}

	// Supabaseの認証トークンを使用してユーザーを取得
	const {
		data: {user},
		error,
	} = await supabase.auth.getUser(token)

	// エラーまたはユーザーが取得できない場合、認証エラーを返す
	if (error || !user) {
		return {user: null, error: 'Unauthorized'}
	}

	// 認証されたユーザーを返す
	return {user, error: null}
}
