import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
	return (
		<header>
			<div>
				<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
					<Container>
						<Navbar.Brand href="/">Project Shop</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ms-auto">
								<Nav.Link href="/cart">
									<i className="fas fa-shopping-cart"></i>Cart
								</Nav.Link>
								<Nav.Link href="/login">
									<i className="fas fa-user"></i>Sign In
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		</header>
	);
};

export default Header;
