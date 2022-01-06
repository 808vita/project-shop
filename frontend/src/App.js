import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-2">
				<Container>
					<Routes>
						<Route exact path="/" element={<HomeScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
