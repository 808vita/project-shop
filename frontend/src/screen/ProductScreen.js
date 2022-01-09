import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
	const history = useNavigate();
	let params = useParams();

	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(params.id));
	}, [dispatch, params]);

	const addToCartHandler = () => {
		history(`/cart/${params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link className="btn btn-dark my-2 " to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger" children={error} />
			) : (
				<Row>
					<Col md={"auto"} lg={6}>
						<Image
							src={product.image}
							alt={product.name}
							fluid
							className="rounded mb-2"
						/>
					</Col>
					<Col md={"auto"} lg={3}>
						<ListGroup variant="flush" className="rounded mb-2 ">
							<ListGroup.Item>
								<h2>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: ${product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={12} lg={3}>
						<Card>
							<ListGroup variant="flush" className=" p-2 ">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													className="form-group has-success is-valid"
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
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
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<div className="d-grid gap-2">
										<Button
											onClick={addToCartHandler}
											className="btn btn-lg btn-primary"
											type="button"
											disabled={product.countInStock === 0}
										>
											Add To Cart
										</Button>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
