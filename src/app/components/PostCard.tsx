'use client'
import {
	Box,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Typography,
} from '@mui/material'
import { Favorite, Comment } from '@mui/icons-material'
import React, { FC, useEffect } from 'react'
import CommentModal from './comments/CommentModal'
import { PostType } from '@/utils/PostType'

type Props = {
	post: PostType
}

const PostCard: FC<Props> = ({ post }) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const [likes, setLikes] = React.useState(0)
	// const [likes, setLikes] = React.useState(post.likes || 0)
	const handleCommentLike = async () => {
		const response = await fetch(`/api/post/${post.id}/like`, {
			method: 'POST',
		})
		if (response.status === 200) {
			const data = await response.json()
			setLikes(data)
			console.log('Like added')
		} else {
			console.error('Failed to add like')
		}
	}
	useEffect(() => {
		fetch(`/api/post/${post.id}/likes`)
			.then((res) => res.json())
			.then((data) => setLikes(data))
	}, [])
	return (
		<>
			<Card sx={{ marginBottom: 2, width: '100%', flexShrink: 0 }}>
				<CardHeader title={post.username} />
				<CardMedia
					component='img'
					height='194'
					image={post.postImage}
					alt='Post image'
				/>
				<CardContent>
					<Typography variant='body2' color='text.secondary'>
						{post.postText}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label='like' onClick={handleCommentLike}>
						<Favorite />
					</IconButton>
					<Typography variant='body2' color='text.secondary'>
						{likes}
					</Typography>
					<IconButton
						aria-label='comment'
						onClick={() => setIsModalOpen(true)}
					>
						<Comment />
					</IconButton>
				</CardActions>
			</Card>
			{isModalOpen && (
				<CommentModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					post={post}
					key={post.id}
				/>
			)}
		</>
	)
}

export default PostCard
