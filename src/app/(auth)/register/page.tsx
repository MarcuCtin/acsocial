'use client'
import React from 'react'
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	CssBaseline,
	Avatar,
	Grid2,
	Link,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { redirect, useRouter } from 'next/navigation'

const RegisterPage = () => {
	const router = useRouter()
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const handleFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()
		const username = event.currentTarget.username.value
		const email = event.currentTarget.email.value
		const password = event.currentTarget.password.value
		const confirmPassword = event.currentTarget.confirmPassword.value
		if (password !== confirmPassword) {
			alert('Passwords do not match')
		}
		setLoading(true)
		await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.ok) {
				redirect('/login')
				alert('Account created successfully')
			} else {
				setError("Failed to create account")
			}
		}).finally(() => {
			setLoading(false)
		})
	}
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
					Sign up
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
						id='username'
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						sx={{ backgroundColor: 'white' }}
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<TextField
						sx={{ backgroundColor: 'white' }}
						margin='normal'
						required
						fullWidth
						name='confirmPassword'
						label='Confirm Password'
						type='password'
						id='confirmPassword'
						autoComplete='current-password'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						{|
							loading ? 'Loading...' : 'Sign Up'}
					</Button>
					<Typography color='error'>{error}</Typography>
					<Grid2 container justifyContent='flex-end'>
						<Grid2 size={'auto'}>
							<Link
								href='#'
								variant='body2'
								onClick={() => router.push('/login')}
							>
								Already have an account? Sign in
							</Link>
						</Grid2>
					</Grid2>
				</Box>
			</Box>
		</Container>
	)
}

export default RegisterPage
