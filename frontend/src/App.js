import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<div>
			<Header />
			<main className="py-3">
				<Container>
					<h1>Project Shop</h1>
				</Container>

				<Footer />
			</main>
		</div>
	);
}

export default App;
