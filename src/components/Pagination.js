import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, pageNumber }) => {
	let content = [];
	let pagesToBeShown = 4;
	let page = pageNumber - pagesToBeShown > 0 ? pageNumber - pagesToBeShown : 1;

	for (let i = 1; i < pagesToBeShown * 2 && page < pages; i++) {
		content.push(
			<Link key={page} to={`/${page}`} className={pageNumber === page ? "active" : null}>
				Page {page}
			</Link>
		);
		page++;
	}

	content.push(
		<Link key={pages} to={`/${pages}`} className={pageNumber === pages ? "active" : null}>
			Page {pages}
		</Link>
	);

	return content;
};

export default Pagination;
