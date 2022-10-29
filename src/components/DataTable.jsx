import React from "react";
import Table from "react-bootstrap/Table";

export default function DataTable(props) {
	const charElements = Object.values(props.chars).map((char) => {
		return (
			<tr>
				<td>{char.name}</td>
				<td>{char.birth}</td>
				<td>{char.height}</td>
				<td>{char.mass}</td>
				<td>{char.homeworld}</td>
				<td>{char.species}</td>
			</tr>
		);
	});

	return (
		<Table className="table" striped bordered hover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Birth Year</th>
					<th>Height</th>
					<th>Mass</th>
					<th>Homeworld</th>
					<th>Species</th>
				</tr>
			</thead>
			<tbody>{charElements}</tbody>
		</Table>
	);
}
