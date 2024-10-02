import {supabase} from '@/utils/supabase'
import {serialize} from 'cookie'

export async function POST(req: Request) {
	try {
		const {email, password} = await req.json()

		const {data, error} = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			return new Response(
				JSON.stringify({
					message: 'Invalid credentials',
					code: error.code,
				}),
				{status: 401},
			)
		}

		const token = data.session?.access_token

		// クッキーにJWTトークンを保存
		return new Response(JSON.stringify({message: 'Logged in successfully'}), {
			status: 200,
			headers: {
				'Set-Cookie': serialize('supabaseToken', token, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 259200, // 3日間
					path: '/',
					sameSite: 'strict',
				}),
			},
		})
	} catch {
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
