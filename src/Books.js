import "./App.css";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

import { useParams } from "react-router-dom";

const Books = () => {
	const { pageNumber } = useParams();

	const [data, setData] = useState([]);
	const [pages, setPages] = useState([]);
	const [search, setSearch] = useState(localStorage.getItem("searchTerm") || "");

	const url = "http://nyx.vima.ekt.gr:3000/api/books";

	useEffect(() => {
		getData();
	}, [pageNumber]);

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
		event.preventDefault();
	};

	const clearSearchTerm = () => {
		setSearch(localStorage.setItem("searchTerm", ""));
	};

	return (
		<>
			<p>Page number is {pageNumber}</p>
			{search && (
				<div>
					<p>Search results shown from {search}</p>
					<button onClick={clearSearchTerm}>Clear search term</button>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} type="text" placeholder={search} />
			</form>
			{data.map((book, index) => (
				<div key={book.id}>
					<p>
						ID:{book.id}, Title: {book.book_title}
					</p>
				</div>
			))}
			<Pagination pages={pages} pageNumber={pageNumber} />
		</>
	);
};

export default Books;
