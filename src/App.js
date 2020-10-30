import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const data = await fetch("http://nyx.vima.ekt.gr:3000/api/books", {
			method: "POST",
		});
		const response = await data.json();
		// console.log(response.books);
		setData(response.books);
	};

	return (
		<main className="App">
			<p>Books</p>
			{data.map((book, index) => (
				<div key={book.id}>
					<p>
						{index + 1} - {book.id}, {book.book_title}
					</p>
				</div>
			))}
		</main>
	);
};

export default App;
