import { Box, CircularProgress } from '@mui/material'
import PostCard from './PostCard'
import { PostType } from '@/utils/PostType'
import { useEffect, useState } from 'react'
import { usePathame } from 'next/router'
import { usePathname } from 'next/navigation'
const Feed = () => {
	// const posts = [
	// 	{
	// 		username: 'User1',
	// 		postImage: 'https://via.placeholder.com/150',
	// 		postText: 'This is a post',
	// 	},
	// 	{
	// 		username: 'User2',
	// 		postImage: 'https://via.placeholder.com/150',
	// 		postText: 'This is another post',
	// 	},

	// 	{
	// 		username: 'User1',
	// 		postImage: 'https://via.placeholder.com/150',
	// 		postText: 'This is a post',
	// 	},

	// 	{
	// 		username: 'User1',
	// 		postImage: 'https://via.placeholder.com/150',
	// 		postText: 'This is a post',
	// 	},

	// 	{
	// 		username: 'User1',
	// 		postImage: 'https://via.placeholder.com/150',
	// 		postText: 'This is a post',
	// 	},
	// ]
	const [posts, setPosts] = useState<PostType[]>([] as Array<PostType>)
	// const pathname = usePathname()

	// const [createModeOn, setCreateModeOn] = useState(pathname === '/post/create')
	// console.log(pathname)
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
