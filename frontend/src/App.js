import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";

function App() {
	return (
		<div>
			<Header />
			<main className="py-3">
				<Container>
					<HomeScreen />
				</Container>

				<Footer />
			</main>
		</div>
	);
}

export default App;
