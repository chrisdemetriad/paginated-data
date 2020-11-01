import React from "react";

const Pagination = ({ pages, pageNumber }) => {
	let content = [];
	let pagesToBeShown = 4;
	let page = pageNumber - pagesToBeShown > 0 ? pageNumber - pagesToBeShown : 1;

	for (let i = 1; i < pagesToBeShown * 2 && page < pages; i++) {
		content.push(
			<a key={page} href={page}>
				Page {page}
			</a>
		);
		page++;
	}

	// content.unshift(
	// 	<a key={0} href="/">
	// 		Home
	// 	</a>
	// );
	content.push(
		<a key={pages} href={pages}>
			Page {pages}
		</a>
	);

	return content;
};

export default Pagination;
