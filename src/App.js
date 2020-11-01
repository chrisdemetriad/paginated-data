import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom-theme.scss";

import Books from "./Books";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<main className="container">
				<Route exact path="/">
					{/* <Books /> */}
					<Redirect to="/1" />
				</Route>
				<Route path="/:pageNumber">
					<Books />
				</Route>
			</main>
		</Router>
	);
};

export default App;
