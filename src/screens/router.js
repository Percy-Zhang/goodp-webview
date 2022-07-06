import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './home'
import CartPage from './cart'
import ProfilePage from './profile'
import BottomNav from '../components/BottomNav'


export default function Router() {
	const [route, setRoute] = useState(0)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				{/* <Route path="/" element={<HomePage />} /> */}
				<Route path="cart" element={<CartPage />} />
				<Route path="profile" element={<ProfilePage />} />
			</Routes>
			<BottomNav route={route} setRoute={setRoute} />
		</BrowserRouter>
	)
}