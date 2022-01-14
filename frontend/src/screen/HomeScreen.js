import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const keyword = params.keyword;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);
	return (
		<>
			<h1>Top Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger" childern={error}></Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col
							key={product._id}
							sm={12}
							md={6}
							lg={4}
							xl={3}
							className="my-2"
						>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
