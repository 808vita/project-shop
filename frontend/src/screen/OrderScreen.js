import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
	const dispatch = useDispatch();
	const params = useParams();

	const [sdkReady, setSdkReady] = useState(false);

	const orderId = params.id;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	if (!loading) {
		// calculate prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(
		() => {
			const addPayPalScript = async () => {
				const { data: clientId } = await axios.get("/api/config/paypal");
				const script = document.createElement("script");
				script.type = "text/javascript";
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
				script.async = true;
				script.onload = () => {
					setSdkReady(true);
				};
				document.body.appendChild(script);
			};

			if (!order || successPay || order._id !== orderId) {
				dispatch({ type: ORDER_PAY_RESET });
				dispatch(getOrderDetails(orderId));
			} else if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript();
				}
			} else {
				setSdkReady(true);
			}
		},
		// eslint-disable-next-line
		[order, orderId, successPay]
	);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush" className="rounded">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name:</strong> {order.user.name}
							</p>
							<p>
								<strong>Email:</strong> {order.user.email}
							</p>

							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address},{order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<hr></hr>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>

						<hr></hr>
						<h5>
							{order.orderItems.length === 0 ? (
								<Message variant="danger">Order is empty!</Message>
							) : (
								<ListGroup variant="flush" className="bg-dark">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														className="rounded"
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = $
													{(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</h5>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h4>Order Summary</h4>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item className="bg-dark">
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
