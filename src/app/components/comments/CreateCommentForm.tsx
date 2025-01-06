import React, { FC, useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

type Props = {
	onSubmit: (commentText: string) => void
	setCreateMode: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCommentForm: FC<Props> = ({ onSubmit, setCreateMode }) => {
	const [commentText, setCommentText] = useState('')

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		onSubmit(commentText)
		setCreateMode(false)
	}

	return (
		<Box component='form' onSubmit={handleSubmit}>
			<TextField
				fullWidth
				label='Comment'
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<Button type='submit' variant='contained' fullWidth>
				Submit
			</Button>
			<Button
				variant='contained'
				fullWidth
				onClick={() => setCreateMode(false)}
			>
				Cancel
			</Button>
		</Box>
	)
}

export default CreateCommentForm
