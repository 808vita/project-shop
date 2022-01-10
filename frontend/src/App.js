import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-2">
				<Container>
					<Routes>
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart/" element={<CartScreen />} />
						<Route path="/cart/:id" element={<CartScreen />} />
						<Route exact path="/" element={<HomeScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
