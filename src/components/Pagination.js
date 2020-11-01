import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, pageNumber }) => {
	let content = [];
	let pagesToBeShown = 4;
	let page = pageNumber - pagesToBeShown > 0 ? pageNumber - pagesToBeShown : 1;

	for (let i = 1; i < pagesToBeShown * 2 && page < pages; i++) {
		content.push(
			<li className="page-item">
				<Link key={page} to={`/${page}`} className={pageNumber === page ? "active" : "page-link"}>
					Page {page}
				</Link>
			</li>
		);
		page++;
	}

	content.push(
		<li className="page-item">
			<Link key={pages} to={`/${pages}`} className={pageNumber === pages ? "active" : "page-link"}>
				Page {pages}
			</Link>
		</li>
	);

	return <ul className="pagination mt-2 d-flex justify-content-center">{content}</ul>;
};

export default Pagination;
