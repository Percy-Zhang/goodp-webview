import { useState } from 'react'

const clearNegatives = (cart) => {
	for (let id in cart) {
		if (cart[id] <= 0) {
			delete cart[id]
		}
	}
}

export default function useCart(initialValue) {
	const [cart, setCart] = useState(initialValue)
	const [info, setInfo] = useState({})
	const data = cart

	const add = async (id, qty) => {
		const newCart = cart
		if (!newCart[id]) newCart[id] = 0
		newCart[id] += parseInt(qty)
		setCart(newCart)
		return true
	}

	const remove = (id, qty=10000) => {
		const newCart = cart
		if (!newCart[id]) return false
		newCart[id] -= parseInt(qty)
		clearNegatives(newCart)
		setCart(newCart)
		return true
	}

	const addInfo = (id, itemInfo) => {
		const newInfo = info
		newInfo[id] = itemInfo
		setInfo(newInfo)
		return true
	}

	const clear = () => {
		setCart({})
	}

	const getTotalQty = () => {
		let totalQty = 0
		for (let id in cart) {
			totalQty += cart[id]
		}
		return totalQty
	}

	const getTotalPrice = (discount) => {
		let totalPrice = 0
		for (let id in cart) {
			const qty = cart[id]
			const price = info[id].item_price - info[id].discount_amount
			totalPrice += qty * price
		}
		return totalPrice
	}

	const getIdList = () => {
		return Object.keys(cart)
	}

	return {
		data,
		info,
		add,
		addInfo,
		remove,
		getTotalQty,
		getTotalPrice,
		getIdList,
		clear,
	}
}