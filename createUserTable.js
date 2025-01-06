import { getOracleConnection } from './oracleClient.js'

export async function createUserTable() {
	const connection = await getOracleConnection()

	try {
		// Check if the users table exists
		const result = await connection.execute(`
      SELECT table_name FROM user_tables WHERE table_name = 'USERS'
    `)

		if (result.rows.length === 0) {
			// Create the users table if it does not exist
			await connection.execute(`
        CREATE TABLE users (
          id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          username VARCHAR2(50) NOT NULL,
          email VARCHAR2(100) NOT NULL,
          password VARCHAR2(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
			console.log('Users table created successfully')
		} else {
			console.log('Users table already exists')
		}
	} catch (error) {
		console.error('Error creating users table:', error)
	} finally {
		await connection.close()
	}
}
