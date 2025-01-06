'use client'
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Box,
	Menu,
	MenuItem,
	Badge,
	useScrollTrigger,
	Slide,
	Button,
	Stack,
} from '@mui/material'
import {
	Search as SearchIcon,
	Settings,
	Notifications,
} from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import getUserFromToken from '@/utils/getUserFromToken'
import { UserType } from '@/utils/UserType'
import { redirect } from 'next/navigation'

const HideOnScroll = ({ children }) => {
	const trigger = useScrollTrigger()
	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	)
}

const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const [username, setUsername] = useState('')
	useEffect(() => {
		const getUser = async () => {
			const user = await getUserFromToken()
			if (user) {
				setUsername(user.username)
			}
		}
		getUser()
	}, [])
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<HideOnScroll>
			<AppBar
				position='fixed'
				sx={{
					backdropFilter: 'blur(10px)',
					bgcolor: 'rgba(255, 255, 255, 0.5)',
					borderRadius: 5,
					mt: 0.5,
					background: 'linear-gradient(to right, #0000ff, #808080)', // Blue to grey gradient
				}}
			>
				<Toolbar>
					{/* Logo */}
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{
							color: 'white',
							fontWeight: 'bold',
							marginLeft: 2,
							flexGrow: 1,
						}}
						onClick={() => redirect('/')}
					>
						AC social
					</Typography>

					<Stack
						flexDirection={'row'}
						sx={{
							width: '50%',
							display: { xs: 'none', md: 'flex' },
							alignItems: 'center',
							height: '100%',
							marginRight: 2,
						}}
					>
						<Button
							variant='contained'
							sx={{
								boxShadow: '0 0 0 0',
								borderRadius: 1,
								mr: 1,
								height: '100%',
								p: '4px 10px',
								backgroundColor: 'rgba(255, 255, 255, 0.15)',
								'&:hover': {
									boxShadow: '0 0 0 0',
									backgroundColor:
										'rgba(255, 255, 255, 0.25)',
								},
							}}
						>
							<Typography
								onClick={() => redirect('/post/create')}
							>
								Create
							</Typography>
							<AddCircleOutlineIcon />
						</Button>
						{/* Search Box */}
						<Box sx={{ flexGrow: 1 }}>
							<Box
								sx={{
									position: 'relative',
									borderRadius: 1,
									backgroundColor:
										'rgba(255, 255, 255, 0.15)',
									'&:hover': {
										backgroundColor:
											'rgba(255, 255, 255, 0.25)',
									},
									marginRight: 2,
									marginLeft: 0,
									width: '100%',
								}}
							>
								<Box
									sx={{
										padding: '0 16px',
										height: '100%',
										position: 'absolute',
										pointerEvents: 'none',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<SearchIcon />
								</Box>
								<InputBase
									placeholder='Search…'
									sx={{
										color: 'inherit',
										paddingLeft: `calc(1em + 32px)`,
										width: '100%',
									}}
								/>
							</Box>
						</Box>
					</Stack>

					{/* Notifications Icon */}
					<IconButton
						size='large'
						aria-label='show new notifications'
						color='inherit'
					>
						<Badge badgeContent={4} color='error'>
							<Notifications />
						</Badge>
					</IconButton>

					{/* User and Settings */}
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography
							variant='body1'
							noWrap
							component='div'
							sx={{ marginRight: 2 }}
						>
							{username}
						</Typography>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<Settings />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	)
}

export default Navbar
