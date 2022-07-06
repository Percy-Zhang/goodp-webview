export function formatPricing(price) {
	return parseInt(price)
		.toString()
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

