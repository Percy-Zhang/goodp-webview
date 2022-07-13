import { useState } from 'react'

import { Link } from 'react-router-dom'

import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from '@mui/material/BottomNavigation'
import styled from '@mui/material/styles/styled'
import HomeIcon from '@mui/icons-material/Home'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import constants from '../constants'

const { PRIMARY, NAVBAR_HEIGHT, PATH } = constants

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: #ddd;
  background-color: ${PRIMARY};
  height: ${NAVBAR_HEIGHT};
  &.Mui-selected {
    color: white;
  }
`)

export default function BottomNav({ route, setRoute }) {
	return (
		<BottomNavigation
			showLabels
			value={route}
			onChange={(event, newValue) => {
				setRoute(newValue)
			}}
		>
			<BottomNavigationAction component={Link} to={PATH.HOME} label='Home' icon={<HomeIcon />} />
			<BottomNavigationAction label='Store' icon={<StoreIcon />} />
			<BottomNavigationAction component={Link} to={PATH.CART} label='Cart' icon={<ShoppingCartIcon />} />
			<BottomNavigationAction component={Link} to={PATH.PROFILE} label='Profile' icon={<AccountBoxIcon />} />
		</BottomNavigation>
	)
}
