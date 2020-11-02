import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import { useParams, withRouter } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";

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

	if (!data) {
		return <p className="mt-5 text-center">Loading..</p>;
	}

	return (
		<>
			<Header search={search} setSearch={setSearch} getData={getData} />
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
