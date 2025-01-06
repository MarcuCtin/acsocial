import { redirect } from 'next/navigation'
import getUserFromToken from './getUserFromToken'

export async function verifySession() {
	const getUser = async () => {
		const user = await getUserFromToken()
		if (user) {
			redirect('/')
		}
	}
	await getUser()
}
