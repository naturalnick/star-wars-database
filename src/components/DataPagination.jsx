import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function DataPagination(props) {
	let items = [];
	for (let number = 1; number <= props.page.total; number++) {
		items.push(
			<Button
				key={number}
				active={number === props.page.active}
				onClick={(event) => props.handlePageTurn(event)}
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
					disabled={
						props.page.isFirst || props.isLoading || props.isSearching
					}
					variant="warning"
					onClick={(event) => props.handlePageTurn(event)}
				>
					Previous
				</Button>
				{items}
				<Button
					className="page-btn"
					disabled={
						props.page.isLast || props.isLoading || props.isSearching
					}
					variant="warning"
					onClick={(event) => props.handlePageTurn(event)}
				>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
}
