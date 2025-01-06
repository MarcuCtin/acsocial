import { NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../../../oracleClient'

export async function GET(req: Request) {
	try {
		const postid = req.url.split('/post/')[1].slice(0, 1)
		const connection = await getOracleConnection()
		const likes = await connection.execute(
			`SELECT COUNT(*) FROM likes WHERE postid = :postid`,
			[postid]
		)
		return new NextResponse(JSON.stringify(likes.rows[0][0]), {
			status: 200,
		})
	} catch (e) {
		return new NextResponse(JSON.stringify({ error: e.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
