import { NextRequest, NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../../oracleClient'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { username, postImage, postText } = body
		const connection = await getOracleConnection()
		await connection.execute(
			`INSERT INTO posts (username, postImage, postText) VALUES (:username, :postImage, :postText)`,
			[username, postImage, postText],
			{ autoCommit: true }
		)
		return new NextResponse(JSON.stringify(body), { status: 200 })
	} catch (e) {
		return new NextResponse(JSON.stringify({ e }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
