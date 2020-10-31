import React from "react";

const Pagination = ({ pages, pageNumber }) => {
	let content = [];
	let pagesToBeShown = 4;
	let page = pageNumber - pagesToBeShown > 0 ? pageNumber - pagesToBeShown : 1;

	for (let i = 0; i < pagesToBeShown * 2 && page < pages; i++) {
		content.push(
			<a key={page} href={page}>
				Page {page}
			</a>
		);
		page++;
	}

	return content;
};

export default Pagination;
