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
import ShippingScreen from "./screen/ShippingScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import UserListScreen from "./screen/UserListScreen";
import UserEditScreen from "./screen/UserEditScreen";
import ProductListScreen from "./screen/ProductListScreen";
import ProductEditScreen from "./screen/ProductEditScreen";
import OrderListScreen from "./screen/OrderListScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-2">
				<Container>
					<Routes>
						<Route path="/order/:id" element={<OrderScreen />} />
						<Route path="/shipping" element={<ShippingScreen />} />
						<Route path="/placeorder" element={<PlaceOrderScreen />} />
						<Route path="/payment" element={<PaymentScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart/" element={<CartScreen />} />
						<Route path="/cart/:id" element={<CartScreen />} />
						<Route path="/admin/userlist" element={<UserListScreen />} />
						<Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
						<Route path="/admin/productlist" element={<ProductListScreen />} />
						<Route
							path="/admin/product/:id/edit"
							element={<ProductEditScreen />}
						/>
						<Route path="/admin/orderlist" element={<OrderListScreen />} />
						<Route path="/search/:keyword" element={<HomeScreen />} />
						<Route exact path="/" element={<HomeScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
