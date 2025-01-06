import { NextRequest, NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../../oracleClient'

export async function GET(req: NextRequest) {
	try {
		const postid = req.url.split('/comments/')[1]

		const connection = await getOracleConnection()
		const comments = await connection.execute(
			`SELECT * FROM comments WHERE postid = :postid`,
			[postid]
		)

		const commentsArray = comments.rows.map((row) => ({
			id: row[0],
			postid: row[1],
			username: row[2],
			text: row[3],
			likes: row[4],
			createdAt: row[5],
		}))
		const orderedCommentsByDateAsc = commentsArray.sort((a, b) => {
			return (
				new Date(a.createdAt).getTime() -
				new Date(b.createdAt).getTime()
			)
		})
		return new NextResponse(JSON.stringify(orderedCommentsByDateAsc), {
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

export async function POST(req: NextRequest) {
	try {
		const postid = req.url.split('/comments/')[1]

		const body = await req.json()
		const { username, text } = body
		const connection = await getOracleConnection()
		await connection.execute(
			`INSERT INTO comments (username,text,postid) VALUES (:username, :text,:postid)`,
			[username, text, postid],
			{ autoCommit: true }
		)
		return new NextResponse(JSON.stringify({ ...body, postid }), {
			status: 200,
		})
	} catch (e) {
		return new NextResponse(JSON.stringify({ error: e.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
