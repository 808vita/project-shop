import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

const Product = ({ product }) => {
	return (
		<Card className=" h-100 my-2 p-2 rounded  ">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" className="card-img-top" />
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name} </strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews}reviews`}
					/>
				</Card.Text>

				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
