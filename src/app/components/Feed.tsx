import { Box, CircularProgress } from '@mui/material'
import PostCard from './PostCard'
import { PostType } from '@/utils/PostType'
import { useEffect, useState } from 'react'

const Feed = () => {
	const [posts, setPosts] = useState<PostType[]>([] as Array<PostType>)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		fetch('/api/post')
			.then((res) => res.json())
			.then((data) => setPosts(data))
			.finally(() => setLoading(false))
	}, [])
	return (
		<Box
			sx={{
				// Set a fixed height for the container
				height: '100vh',
				width: '500px',
				mt: 10,
				justifyContent: loading ? 'center' : 'start',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: 2,
			}}
		>
			{loading ? (
				<CircularProgress />
			) : (
				posts.map((post, index) => <PostCard key={index} post={post} />)
			)}
		</Box>
	)
}

export default Feed
