import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
	process.env.JWT_SECRET || 'your-secret-key'
)

export default async function middleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const url = req.nextUrl.clone()
	console.log(token, 'token')
	if (token) {
		try {
			// const { payload } = await jwtVerify(token, SECRET_KEY)
			// console.log('decoded', payload.username)
			if (url.pathname === '/login' || url.pathname === '/register') {
				return NextResponse.redirect(new URL('/', req.url))
			}
			return NextResponse.next()
		} catch (error) {
			console.error('JWT verification failed:', error)
			if (url.pathname !== '/login' && url.pathname !== '/register') {
				url.pathname = '/login'
				return NextResponse.redirect(url)
			}
		}
	} else {
		if (url.pathname !== '/login' && url.pathname !== '/register') {
			url.pathname = '/login'
			return NextResponse.redirect(url)
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
