'use client'
import { Box } from '@mui/material'
import Feed from './components/Feed'

export default function Home() {
	return (
		<Box
			sx={{
				width: '100vw',

				border: '1px solid red',
				display: 'flex',
				overflowY: 'scroll',
				justifyContent: 'center',
			}}
		>
			<Feed />
		</Box>
	)
}
