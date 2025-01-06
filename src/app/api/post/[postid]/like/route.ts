import { NextRequest, NextResponse } from 'next/server'
import { getOracleConnection } from '../../../../../../oracleClient'
import getUserFromToken from '@/utils/getUserFromToken'

export async function POST(req: NextRequest) {
	try {
		const postid = req.url.split('/post/')[1].slice(0, 1)
		const user = await getUserFromToken()
		const userid = user && user.id
		console.log(userid, 'userid', postid, 'postid')
		const connection = await getOracleConnection()
		await connection.execute(
			`
            INSERT INTO likes (postid,userid) VALUES (:postid,:userid)
            `,
			[postid, userid],
			{
				autoCommit: true,
			}
		)

		const likes = await connection.execute(
			`
            SELECT COUNT(*) FROM likes WHERE postid = :postid
        `,
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
