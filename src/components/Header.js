import React from "react";
import { MdClear } from "react-icons/md";

import { Button, InputGroup, FormControl, Badge } from "react-bootstrap";

const Header = ({ search, setSearch, getData }) => {
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
		</>
	);
};

export default Header;
