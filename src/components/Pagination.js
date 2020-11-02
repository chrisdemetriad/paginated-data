import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, pageNumber }) => {
	let content = [];
	let pagesToBeShown = 4;
	let page = pageNumber - pagesToBeShown > 0 ? pageNumber - pagesToBeShown : 1;

	for (let i = 1; i < pagesToBeShown * 2 && page < pages; i++) {
		content.push(
			<li key={page} className={pageNumber == page ? "page-item active" : "page-item"}>
				<Link to={`/${page}`} className="page-link">
					{page}
				</Link>
			</li>
		);
		page++;
	}

	content.push(
		<li key={pages} className={pageNumber == page ? "page-item active" : "page-item"}>
			<Link to={`/${pages}`} className="page-link">
				{pages}
			</Link>
		</li>
	);

	return <ul className="pagination mt-2 d-flex justify-content-center">{content}</ul>;
};

export default Pagination;
