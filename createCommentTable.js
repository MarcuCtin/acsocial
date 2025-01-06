import { getOracleConnection } from './oracleClient.js'

export async function createCommentTable() {
	const connection = await getOracleConnection()

	try {
		// Check if the comments table exists
		const result = await connection.execute(`
      SELECT table_name FROM user_tables WHERE table_name = 'COMMENTS'
    `)

		if (result.rows.length === 0) {
			// Create the comments table if it does not exist
			await connection.execute(`
        CREATE TABLE comments (
          id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          postid NUMBER NOT NULL,
          username VARCHAR2(50) NOT NULL,
          text VARCHAR2(255) NOT NULL,
          likes NUMBER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (postid) REFERENCES posts(id)
        )
      `)
			console.log('Comments table created successfully')
		} else {
			console.log('Comments table already exists')
		}
	} catch (error) {
		console.error('Error creating comments table:', error)
	} finally {
		await connection.close()
	}
}