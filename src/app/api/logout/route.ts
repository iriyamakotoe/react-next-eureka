import {serialize} from 'cookie'

export async function POST() {
	try {
		// クッキーを削除
		const cookie = serialize('supabaseToken', '', {
			maxAge: -1,
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
		})

		return new Response(JSON.stringify({message: 'Logged out successfully'}), {
			status: 200,
			headers: {
				'Set-Cookie': cookie,
			},
		})
	} catch (error) {
		console.error('Logout error:', error)
		return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500})
	}
}
