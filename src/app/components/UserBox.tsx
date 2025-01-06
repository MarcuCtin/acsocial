import { auth } from '@/auth'
import { Typography } from '@mui/material'

const UserBox = async () => {
	const session = await auth()
	if (!session) {
		return null
	}
	return (
		<>
			<Typography
				variant='body1'
				noWrap
				component='div'
				sx={{ marginRight: 2 }}
			>
				Username
			</Typography>
		</>
	)
}
export default UserBox
