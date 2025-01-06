import React, { FC, useState } from 'react'
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	IconButton,
	Typography,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CommentType } from '@/utils/CommentType'

type Props = {
	comment: CommentType
}

const CommentCard: FC<Props> = ({ comment }) => {
	const [likes, setLikes] = useState(comment.likes || 0)
	const [liked, setLiked] = useState(false)

	const handleLike = () => {
		if (liked) {
			setLikes(likes - 1)
		} else {
			setLikes(likes + 1)
		}
		setLiked(!liked)
	}

	return (
		<Card sx={{ marginBottom: 2 }}>
			<CardHeader
				title={comment.username}
				sx={{
					fontSize: '0.1rem',
				}}
			/>
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{comment.text}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton onClick={handleLike} aria-label='like'>
					<FavoriteIcon color={liked ? 'error' : 'inherit'} />
				</IconButton>
				<Typography variant='body2' color='text.secondary'>
					{likes}
				</Typography>
			</CardActions>
		</Card>
	)
}

export default CommentCard
