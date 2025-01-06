import { NextRequest, NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../../oracleClient'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { username, postImage, postText } = body
		console.log(body)
		const connection = await getOracleConnection()
		const result = await connection.execute(
			`INSERT INTO posts (username, postImage, postText) VALUES (:username, :postImage, :postText)`,
			[username, postImage, postText],
			{ autoCommit: true }
		)
		return new NextResponse(JSON.stringify(body), { status: 200 })
	} catch (e) {
		return {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ error: e.message }),
		}
	}
}
