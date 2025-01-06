'use client'
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	TextField,
	Button,
} from '@mui/material'
import React, { FC, useState } from 'react'

type Props = {
	username: string
	onSubmit: (postImage: string, postText: string) => void
}

const PostForm: FC<Props> = ({ username, onSubmit }) => {
	const [postImage, setPostImage] = useState('')
	const [postText, setPostText] = useState('')

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		onSubmit(postImage, postText)
	}

	return (
		<Card sx={{ marginBottom: 2, width: '100%', flexShrink: 0 }}>
			<CardHeader title='Create Post' />
			<CardContent>
				<Box component='form' onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label='Username'
						value={username}
						disabled
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						label='Post Image URL'
						value={postImage}
						onChange={(e) => setPostImage(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						label='Post Text'
						value={postText}
						onChange={(e) => setPostText(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<Button type='submit' variant='contained' fullWidth>
						Submit
					</Button>
				</Box>
			</CardContent>
		</Card>
	)
}

export default PostForm
