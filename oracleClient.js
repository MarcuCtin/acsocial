import oracledb from 'oracledb'

let pool
export async function initOraclePool() {
	if (!pool) {
		pool = await oracledb.createPool({
			user: process.env.ORACLE_USER,
			password: process.env.ORACLE_PASSWORD,
			connectString: process.env.ORACLE_CONNECTION_STRING,
			poolMin: 10,
			poolMax: 10,
			poolIncrement: 0,
		})
	}
}

export async function getOracleConnection() {
	await initOraclePool()
	return await pool.getConnection()
}
