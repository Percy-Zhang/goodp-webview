import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './home'
import CartPage from './cart'
import ProfilePage from './profile'
import DetailsPage from './details'
import CheckoutPage from './checkout'
import BottomNav from '../components/BottomNav'

import constants from '../constants'

const { PATH } = constants


export default function Router() {
	const [route, setRoute] = useState(0)
	const Nav = () => <BottomNav route={route} setRoute={setRoute} />
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PATH.HOME} element={<HomePage />} />
				<Route path={PATH.CART} element={<CartPage />} />
				<Route path={PATH.CHECKOUT} element={<CheckoutPage />} />
				<Route path={PATH.PROFILE} element={<ProfilePage />} />
				<Route path={`${PATH.PRODUCT}:id`} element={<DetailsPage />} />
				<Route path="*" element={<Navigate to={PATH.HOME} />} />
			</Routes>
			<Routes>
				<Route path={PATH.NOT_HOME} element={<Nav />} />
				<Route path="*" element={<></>} />
			</Routes>
		</BrowserRouter>
	)
}