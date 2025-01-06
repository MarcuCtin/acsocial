import { getOracleConnection } from '../../oracleClient'

export async function getUserFromDB(credentials: {
	username: string
	password: string
}) {
	const connection = await getOracleConnection()
	try {
		const query = `
            SELECT *
            FROM users
            WHERE username = ${credentials.username}
            AND password = ${credentials.password}
        `
		const result = await connection.execute(query)
		if (result.rows && result.rows.length === 0) {
			return null
		}
		if (!result.rows) {
			throw new Error('No users found')
		}
		return {
			id: result.rows[0].ID,
			username: result.rows[0].USERNAME,
		}
	} catch (error) {
		console.error(error)
		return null
	} finally {
		await connection.close()
	}
}
