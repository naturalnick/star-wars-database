import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function DataPagination(props) {
	//to populate pagination numbers // change to buttons
	// let items = [];
	// for (let number = 1; number <= props.pages.total; number++) {
	// 	items.push(
	// 		<Pagination.Item
	// 			key={number}
	// 			active={number === props.pages.active}
	// 			onClick={(event) => props.handlePageTurn(event)}
	// 		>
	// 			{number}
	// 		</Pagination.Item>
	// 	);
	// }
	return (
		<div>
			<ButtonGroup aria-label="pagination">
				<Button
					className="page-btn"
					disabled={
						props.page.isFirst || props.isLoading || props.isSearching
					}
					variant="light"
					onClick={(event) => props.handlePageTurn(event)}
				>
					Previous
				</Button>
				<Button
					className="page-btn"
					disabled={
						props.page.isLast || props.isLoading || props.isSearching
					}
					variant="light"
					onClick={(event) => props.handlePageTurn(event)}
				>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
}
