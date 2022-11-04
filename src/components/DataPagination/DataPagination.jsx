import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import usePageTotal from "./usePageTotal";
import "./DataPagination.css";

export default function DataPagination({
	page,
	isLoading,
	isSearching,
	handlePageTurn,
	url,
}) {
	const pageTotal = usePageTotal(url);

	let items = [];
	for (let number = 1; number <= pageTotal; number++) {
		items.push(
			<Button
				className="page-btn-inner"
				key={number}
				active={number === page.active}
				disabled={number === page.active || isLoading || isSearching}
				onClick={(event) => handlePageTurn(event)}
				variant="light"
			>
				{number}
			</Button>
		);
	}
	return (
		<div>
			<ButtonGroup aria-label="pagination">
				<Button
					className="page-btn"
					disabled={page.isFirst || isLoading || isSearching}
					variant="light"
					onClick={(event) => handlePageTurn(event)}
				>
					Previous
				</Button>
				{items}
				<Button
					className="page-btn"
					disabled={page.isLast || isLoading || isSearching}
					variant="light"
					onClick={(event) => handlePageTurn(event)}
				>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
}
