import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import usePageTotal from "./usePageTotal";
import "./DataPagination.css";

export default function DataPagination({
	page,
	isSearching,
	handlePageTurn,
	url,
}) {
	const pageTotal = usePageTotal(url);
	const pageNumbers = getPageNumbers(pageTotal);

	function getPageNumbers(numberOfPages) {
		let pageArray = [];
		for (let number = 1; number <= numberOfPages; number++) {
			pageArray.push(
				<Button
					className="page-btn-inner"
					key={number}
					active={number === page.active}
					disabled={number === page.active || isSearching}
					onClick={() => handlePageTurn(number)}
					variant="light"
				>
					{number}
				</Button>
			);
		}
		return pageArray;
	}

	return (
		<div>
			<ButtonGroup aria-label="pagination">
				<Button
					className="page-btn"
					disabled={page.isFirst || isSearching}
					variant="light"
					onClick={() => {
						!page.isFirst && handlePageTurn(page.active - 1);
					}}
				>
					Previous
				</Button>
				{pageNumbers}
				<Button
					className="page-btn"
					disabled={page.isLast || isSearching}
					variant="light"
					onClick={() => {
						!page.isLast && handlePageTurn(page.active + 1);
					}}
				>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
}
