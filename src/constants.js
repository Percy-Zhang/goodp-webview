const constants = {
	MERCHANT_URL: "https://backend.marathonmyanmar.net/api/v1/merchant_dashboard",
	GOODP_URL: "https://mmgoodpay.com/api/v1/agent_web",

	PRIMARY: "#67ae3f",

	NAVBAR_HEIGHT: "7vh",
	SCREEN_HEIGHT_NAVBAR: "93vh",
	SCREEN_HEIGHT: "100vh",
	SCREEN_WIDTH: "100vw",

	PATH: {
		HOME: "/home",
		CART: "/cart",
		CHECKOUT: "/cart/checkout",
		PROFILE: "/home/profile",
		PRODUCT: "/products/details/",
		NOT_HOME: "/home/*",
	},

	IMAGE: {
		EMPTY_CART: require("./assets/empty_cart.png"),
	},
}

export default constants