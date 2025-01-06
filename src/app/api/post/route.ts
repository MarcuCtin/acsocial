import { NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../oracleClient'
export async function GET() {
	try {
		const connection = await getOracleConnection()
		const result = await connection.execute(`SELECT * FROM posts`)
		const posts = result.rows.map((row) => ({
			id: row[0],
			username: row[1],
			postImage: row[2],
			postText: row[3],
			createdAt: row[4],
		}))
		const orderedPostsByDateAsc = posts.sort((a, b) => {
			return (
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
			)
		})
		return new NextResponse(JSON.stringify(orderedPostsByDateAsc), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (e) {
		return new NextResponse(JSON.stringify({ error: e.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
