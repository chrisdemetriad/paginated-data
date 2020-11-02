import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { Button, ListGroup, InputGroup, FormControl, Badge } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import { MdClear } from "react-icons/md";

const Books = (props) => {
	const { pageNumber } = useParams();

	const [data, setData] = useState([]);
	const [pages, setPages] = useState([]);
	const [search, setSearch] = useState(localStorage.getItem("searchTerm") || "");

	const url = "http://nyx.vima.ekt.gr:3000/api/books";

	useEffect(() => {
		getData(false);
	}, [pageNumber]);

	const getData = async (mustRedirect) => {
		try {
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

			if (mustRedirect) {
				props.history.push("/");
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleChange = (event) => {
		setSearch(event.target.value);
		localStorage.setItem("searchTerm", event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getData(true);
	};

	const clearSearchTerm = () => {
		localStorage.removeItem("searchTerm");
		setSearch("");
		getData(true);
	};

	if (!data) {
		return <p className="mt-5 text-center">Loading..</p>;
	}

	return (
		<>
			<h2 onClick={clearSearchTerm} title="Go home and clear search" className="mt-4 mb-4">
				Book List
			</h2>

			<form onSubmit={handleSubmit}>
				<InputGroup className="mb-3">
					<InputGroup.Append>
						{search && (
							<Button variant="outline-secondary" title="Clear search">
								<MdClear onClick={clearSearchTerm} />
							</Button>
						)}
					</InputGroup.Append>
					<FormControl onChange={handleChange} type="text" placeholder={search} />

					<InputGroup.Append>
						<Button type="submit" variant="primary">
							Search
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</form>
			{search ? <p>Search results shown for {search}</p> : <p>No search filters applied</p>}
			{data && (
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
			)}

			<Pagination pages={pages} pageNumber={pageNumber} />
		</>
	);
};

export default withRouter(Books);
