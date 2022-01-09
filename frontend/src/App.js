import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-2">
				<Container>
					<Routes>
						<Route exact path="/" element={<HomeScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart/" element={<CartScreen />} />
						<Route path="/cart/:id" element={<CartScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
