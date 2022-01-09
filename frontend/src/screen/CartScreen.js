import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useEffect } from "react/cjs/react.development";

const CartScreen = () => {
	const params = useParams();
	const history = useNavigate();
	const location = useLocation();

	const productId = params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkOutHandler = () => {
		history("/login?redirect=shipping");
	};
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message childern="Your cart is empty!" />
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										></Image>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={3}>
										<Form.Control
											className="form-group has-success is-valid"
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option
													className="dropdown-item  active "
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>
								SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								ITEMS
							</h3>
							<h5>
								$
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</h5>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn btn-lg btn-primary"
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
