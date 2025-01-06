import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { getOracleConnection } from '../../../../oracleClient'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: NextRequest) {
	const body = await req.json()
	const { username, password } = body

	const connection = await getOracleConnection()

	try {
		const result = await connection.execute(
			`SELECT * FROM users WHERE username = :username AND password = :password`,
			[username, password]
		)
		console.log(result)
		if (!result || !result.rows) {
			return new NextResponse(
				JSON.stringify({ message: 'Invalid username or password' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			)
		}
		if (result.rows.length > 0) {
			const user = result.rows[0]
			const id = user[0]
			const username = user[2]
			const token = jwt.sign({ id, username }, SECRET_KEY, {
				expiresIn: '1h',
			})

			const cookie = serialize('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 3600,
				path: '/',
			})

			const response = new NextResponse(
				JSON.stringify({ message: 'Login successful' }),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			)
			response.headers.set('Set-Cookie', cookie)

			return response
		} else {
			return new NextResponse(
				JSON.stringify({ message: 'Invalid username or password' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			)
		}
	} catch (error) {
		console.error(error)
		return new NextResponse(JSON.stringify({ message: 'Login failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	} finally {
		await connection.close()
	}
}
