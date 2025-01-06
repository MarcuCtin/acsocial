'use client'
import PostCard from '@/app/components/PostCard'
import PostForm from '@/app/components/PostForm'
import getUserFromToken from '@/utils/getUserFromToken'
import { Feed } from '@mui/icons-material'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CreatePage = () => {
	const [username, setUsername] = useState<string>('')
	const getUser = async () => {
		const user = await getUserFromToken()
		if (user) {
			setUsername(user.username)
		}
	}
	useEffect(() => {
		getUser()
	}, [])
	const onSubmit = async (postImage: string, postText: string) => {
		const response = await fetch('/api/post/create', {
			method: 'POST',
			body: JSON.stringify({
				username,
				postImage,
				postText,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (response.ok && response.status === 200) {
			redirect('/')
		} else {
			console.error('Failed to create post')
		}
	}

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
			<Box
				sx={{
					// Set a fixed height for the container
					height: '100vh',
					width: '500px',

					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: 2,
				}}
			>
				<PostForm username={username} onSubmit={onSubmit} />
			</Box>
		</Box>
	)
}

export default CreatePage
