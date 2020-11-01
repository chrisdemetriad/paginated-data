import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { Button, ListGroup, InputGroup, FormControl, Badge } from "react-bootstrap";

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
			<h2 className="mt-4 mb-4">Book List</h2>
			<form onSubmit={handleSubmit}>
				<InputGroup className="mb-3">
					<FormControl onChange={handleChange} type="text" placeholder={search} placeholder="Type here.." />
					<InputGroup.Append>
						{search && (
							<Button variant="outline-secondary" onClick={clearSearchTerm}>
								Clear search term
							</Button>
						)}
					</InputGroup.Append>
					<InputGroup.Append>
						<Button variant="primary">Search</Button>
					</InputGroup.Append>
				</InputGroup>
			</form>
			{search && <p>Search results shown from {search}</p>}
			<ListGroup>
				{data.map((book, index) => (
					<ListGroup.Item className="book" key={book.id}>
						<Badge pill variant="success" className="mr-1">
							ID: {book.id}
						</Badge>
						{book.book_title}
					</ListGroup.Item>
				))}
			</ListGroup>

			<Pagination pages={pages} pageNumber={pageNumber} />
		</>
	);
};

export default Books;
