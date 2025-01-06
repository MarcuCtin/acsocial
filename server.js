import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { initOraclePool } from './oracleClient.js' // Add the .js extension
import { createPostTable } from './createPostTable.js'
import { createUserTable } from './createUserTable.js'
import { createCommentTable } from './createCommentTable.js'
import { createLikesTable } from './createLikesTable.js'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
	await initOraclePool()
	await createPostTable()
	await createUserTable()
	await createCommentTable()
	await createLikesTable()
	createServer((req, res) => {
		const parsedUrl = parse(req.url || '', true)
		handle(req, res, parsedUrl)
	}).listen(3000, () => {
		console.log('> Ready on http://localhost:3000')
	})
})
