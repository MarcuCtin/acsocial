import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'
type Props = {
	children: React.ReactNode
}
const ProtectedByAuth: FC<Props> = async ({ children }) => {
	const session = await auth()
	if (!session) {
		redirect('/login')
	}
	return <>{children}</>
}

export default ProtectedByAuth
