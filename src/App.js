import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Books from "./Books";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	return (
		<Router>
			<main className="container">
				<Route exact path="/">
					<Books />
				</Route>
				<Route path="/:pageNumber">
					<Books />
				</Route>
			</main>
		</Router>
	);
};

export default App;
