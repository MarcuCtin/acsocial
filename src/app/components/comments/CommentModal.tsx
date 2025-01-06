import { PostType } from '@/utils/PostType'
import React, { FC, useEffect, useState } from 'react'
import {
	Box,
	Modal,
	Typography,
	IconButton,
	Divider,
	Stack,
	Button,
	CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CommentCard from './CommentCard'
import { CommentType } from '@/utils/CommentType'
import CreateCommentForm from './CreateCommentForm'
import getUserFromToken from '@/utils/getUserFromToken'

type Props = {
	isModalOpen: boolean
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	post: PostType
}

const CommentModal: FC<Props> = ({ isModalOpen, setIsModalOpen, post }) => {
	const [comments, setComments] = useState<CommentType[]>([])
	const [username, setUsername] = useState('')
	useEffect(() => {
		const getUser = async () => {
			const user = await getUserFromToken()
			if (user) {
				setUsername(user.username)
			}
		}
		getUser()
		const getComments = async () => {
			fetch(`/api/comments/${post.id}`)
				.then((res) => res.json())
				.then((data) => setComments(data))
		}
		getComments()
	}, [])
	const onsubmit = async (commentText: string) => {
		fetch(`/api/comments/${post.id}`, {
			method: 'POST',
			body: JSON.stringify({ text: commentText, username }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => setComments([...comments, data]))
	}
	const handleClose = () => {
		setIsModalOpen(false)
	}
	const [createMode, setCreateMode] = useState(false)
	return (
		<Modal open={isModalOpen} onClose={handleClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					color: '#000',
				}}
			>
				{createMode ? (
					<CreateCommentForm
						setCreateMode={setCreateMode}
						onSubmit={onsubmit}
					/>
				) : (
					<>
						<Box
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							color={'#000'}
						>
							<Typography variant='h6'>Comments</Typography>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</Box>
						<Stack
							flexDirection={'row'}
							gap={2}
							alignItems={'center'}
						>
							<Typography variant='subtitle1'>
								Likes: 0
							</Typography>
							<Typography variant='subtitle1'>
								Comments:{' '}
								{comments ? comments.length : 'Loading'}
							</Typography>
						</Stack>
						<Divider sx={{ my: 2 }} />
						<Box
							key={post.id}
							sx={{ maxHeight: 300, overflowY: 'auto' }}
						>
							{comments ? (
								comments.map((comment) => (
									<CommentCard
										key={comment.id}
										comment={comment}
									/>
								))
							) : (
								<CircularProgress />
							)}
						</Box>
					</>
				)}
				<Box>
					{!createMode && (
						<Button
							variant='contained'
							onClick={() => setCreateMode(true)}
						>
							Add Comment
						</Button>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default CommentModal
