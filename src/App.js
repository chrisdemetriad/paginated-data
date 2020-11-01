import "./App.css";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
const App = () => {
	let path = window.location.pathname;
	let pageNumber = path.substr(1);

	const [data, setData] = useState([]);
	const [pages, setPages] = useState([]);
	const [search, setSearch] = useState(localStorage.getItem("searchTerm") || "");

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
				filters: [{ type: "all", values: [search] }],
			}),
		});
		const response = await data.json();
		const booksNumber = response.count;
		const pages = Math.ceil(booksNumber / 20);

		setPages(pages);
		setData(response.books);
	};

	const handleChange = (event) => {
		setSearch(event.target.value);
		localStorage.setItem("searchTerm", event.target.value);
	};

	const handleSubmit = (event) => {
		getData(search);
		window.location.href = "/";
		event.preventDefault();
	};

	const clearSearchTerm = () => {
		setSearch(localStorage.setItem("searchTerm", ""));
		window.location.href = "/";
	};

	return (
		<main className="App">
			<h3>Books</h3>
			<p>Search results shown from {search} </p>
			<button onClick={clearSearchTerm}>Clear search term</button>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} type="text" placeholder={search} />
			</form>
			{data.map((book, index) => (
				<div key={book.id}>
					<p>
						{index + 1} - {book.id}, {book.book_title}, {book.book_pages} pages, published in {book.book_publication_year} in {book.book_publication_city}, {book.book_publication_country}
					</p>
				</div>
			))}

			<Pagination pages={pages} pageNumber={pageNumber} />
		</main>
	);
};

export default App;
