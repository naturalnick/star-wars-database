import Pagination from "react-bootstrap/Pagination";

export default function DataPagination(props) {
	return (
		<div className="centered">
			<Pagination>
				<Pagination.First />
				<Pagination.Prev />
				<Pagination.Item active>{1}</Pagination.Item>
				<Pagination.Item>{2}</Pagination.Item>
				<Pagination.Item>{3}</Pagination.Item>
				<Pagination.Ellipsis />
				<Pagination.Next />
				<Pagination.Last />
			</Pagination>
		</div>
	);
}
