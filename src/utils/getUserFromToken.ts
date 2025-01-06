'use server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { UserType } from './UserType'
const SECRET_KEY = process.env.JWT_SECRET
const getUserFromToken = async (): Promise<UserType | null> => {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value
	if (!token) {
		return null
	}
	if (token) {
		if (!SECRET_KEY) {
			throw new Error('JWT_SECRET is not defined')
		}
		const { payload } = await jwtVerify(
			token,
			new TextEncoder().encode(SECRET_KEY)
		)
		return {
			id: Number(payload.id),
			username: payload.username as string,
		} as UserType
	}
	return null
}

export default getUserFromToken
