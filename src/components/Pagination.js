import React from "react";

const Pagination = ({ pages, pageNumber }) => {
	let content = [];

	for (let i = 1; i <= pages; i++) {
		if (pageNumber !== i) content.push(<a href={i}>Page {i}</a>);
	}

	return content;
};

export default Pagination;
