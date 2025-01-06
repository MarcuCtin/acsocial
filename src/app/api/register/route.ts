import { NextRequest, NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../oracleClient'

export async function POST(req: NextRequest) {
	const body = await req.json()
	const { username, email, password } = body

	const connection = await getOracleConnection()

	try {
		await connection.execute(
			`INSERT INTO users (username, email, password) VALUES (:username, :email, :password)`,
			[username, email, password],
			{ autoCommit: true }
		)

		return new NextResponse(
			JSON.stringify({ message: 'User registered successfully' }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	} catch (error) {
		console.error(error)
		return new NextResponse(
			JSON.stringify({ message: 'Registration failed' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		)
	}
}
