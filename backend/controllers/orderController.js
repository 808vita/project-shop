import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @des create a new order
// @route  post /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @des get order by id
// @route  get  /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @des update order to paid
// @route  get  /api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		(order.isPaid = true), (order.paidAt = Date.now());
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_item: req.body.update_item,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @des update order to delivered
// @route  get  /api/orders/:id/deliver
// @access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		(order.isDelivered = true), (order.deliveredAt = Date.now());

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @des get logged in user orders
// @route  get  /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

// @des get all orders
// @route  get  /api/orders/
// @access private/admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find().populate("user", "id name");

	res.json(orders);
});

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
};
