'use client'
import React, { useEffect, useState } from 'react'
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	CssBaseline,
	Avatar,
	Link,
	Grid2,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { redirect } from 'next/navigation'

import { verifySession } from '@/utils/verifySession'

const LoginPage = () => {
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const handleFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const username = formData.get('email') as string
		const password = formData.get('password') as string
		try {
			setLoading(true)
			const response = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			verifySession()
			if (response.status === 200) {
				verifySession()
			} else {
				setError('Failed to sign in')
				console.log(response)
			}
			setLoading(false)
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(() => {
		verifySession()
	}, [])
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<Box
					component='form'
					onSubmit={handleFormSubmit}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						sx={{ backgroundColor: 'white' }}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						{loading ? 'Loading...' : 'Sign In'}
					</Button>
					<Typography color='error'>{error}</Typography>
					<Grid2 container>
						<Grid2 size={'auto'}>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid2>
						<Grid2 size={'auto'}>
							<Link
								href='#'
								variant='body2'
								onClick={() => redirect('/register')}
							>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid2>
					</Grid2>
				</Box>
			</Box>
		</Container>
	)
}

export default LoginPage
