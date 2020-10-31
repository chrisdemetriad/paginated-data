import "./App.css";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
const App = () => {
	// We can also use URLSearchParamsm but it doesn't work in IE
	// In a real world scenario I would use
	// https://github.com/pbeshai/use-query-params, or similar

	let path = window.location.pathname;
	let pageNumber = path.substr(1);

	const [data, setData] = useState([]);
	const [pages, setPages] = useState([]);

	const url = "http://nyx.vima.ekt.gr:3000/api/books";

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const data = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				page: pageNumber || 1,
			}),
		});
		const response = await data.json();
		const booksNumber = response.count;
		const pages = Math.ceil(booksNumber / 20);

		setPages(pages);
		setData(response.books);
	};

	return (
		<main className="App">
			<h3>Books</h3>
			{data.map((book, index) => (
				<div key={book.id}>
					<p>
						{index + 1} - {book.id}, {book.book_title}
					</p>
				</div>
			))}

			<Pagination pages={pages} pageNumber={pageNumber} />
		</main>
	);
};

export default App;
