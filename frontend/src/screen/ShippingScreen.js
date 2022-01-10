import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {
	const params = useParams();
	const history = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history("/payment");
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address" className="mb-2">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={address}
						required
						onChange={(e) => {
							setAddress(e.target.value);
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city" className="mb-2">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter City"
						value={city}
						required
						onChange={(e) => {
							setCity(e.target.value);
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="postalCode" className="mb-2">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Postal Code"
						value={postalCode}
						required
						onChange={(e) => {
							setPostalCode(e.target.value);
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="country" className="mb-2">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Country"
						value={country}
						required
						onChange={(e) => {
							setCountry(e.target.value);
						}}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
