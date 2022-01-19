import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
	listProductDetails,
	createProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
	const history = useNavigate();
	let params = useParams();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const review =
		product.reviews[Math.floor(Math.random() * (product.reviews.length - 1))];

	const recentReview = product.reviews[product.reviews.length - 1];

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { success: sucessProductReview, error: errorProductReview } =
		productReviewCreate;

	useEffect(() => {
		if (sucessProductReview) {
			alert("Review Submitted!");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(params.id));
	}, [dispatch, params, sucessProductReview]);

	const addToCartHandler = () => {
		history(`/cart/${params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(params.id, {
				rating,
				comment,
			})
		);
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
				<>
					<Meta title={product.name} />
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
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={12} lg={3}>
							<Card>
								<ListGroup variant="flush" className="rounde ">
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
														className="form-group  "
														as="select"
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option
																	className="dropdown-item  active "
																	key={x + 1}
																	value={x + 1}
																>
																	{x + 1}
																</option>
															)
														)}
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
					<Row>
						<Col md={12} lg={9}>
							<ListGroup variant="flush" className="rounded mt-2">
								<h2 className="rounded m-2">Recent Review</h2>
								<hr></hr>

								{product.reviews.length === 0 && <Message>No Reviews</Message>}

								<ListGroup.Item variant="flush">
									<strong>{recentReview.name}</strong>
									<Rating value={recentReview.rating} />
									<p>{recentReview.createdAt}</p>
									<p>{recentReview.comment}</p>
								</ListGroup.Item>
							</ListGroup>

							<ListGroup variant="flush" className="rounded mt-2">
								<h2 className="rounded m-2">Random Review</h2>
								<hr></hr>

								<ListGroup.Item variant="flush">
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{review.createdAt}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>

								{/* {product.reviews.map((review) => (
									<ListGroup.Item key={review._id} variant="flush">
										{console.log(review)}
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))} */}
							</ListGroup>
						</Col>
						<Col md={12} lg={9}>
							<ListGroup variant="flush" className="rounded mt-2">
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{errorProductReview && (
										<Message variant="danger">{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>

												<Form.Control
													as="select"
													className="bg-dark"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select...</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
											</Form.Group>

											<Form.Group controlId="comment">
												<Form.Label>Review</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													className="bg-dark"
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>

											<Button type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to="/login">sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
