import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const url = req.nextUrl.clone()
	if (token) {
		try {
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
