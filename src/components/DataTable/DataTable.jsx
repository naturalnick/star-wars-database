import React from "react";
import Table from "react-bootstrap/Table";

import "./DataTable.css";

export default function DataTable({ isLoading, chars }) {
	const charElements = isLoading ? (
		<tr>
			<td className="data-placeholder" colSpan="6">
				Loading...
			</td>
		</tr>
	) : (
		Object.values(chars).map((char) => {
			return (
				<tr key={char.key}>
					<td>{char.name}</td>
					<td>{char.birth_year}</td>
					<td>{char.height}</td>
					<td>{char.mass}</td>
					<td>{char.homeworld}</td>
					<td>{char.species}</td>
				</tr>
			);
		})
	);

	return (
		<div className="table-container">
			<Table className="table" striped hover>
				<thead>
					<tr>
						<th width="25%">Name</th>
						<th width="15%">Birth Year</th>
						<th width="15%">Height (cm)</th>
						<th width="15%">Mass (kg)</th>
						<th width="15%">Homeworld</th>
						<th width="15%">Species</th>
					</tr>
				</thead>
				<tbody>{charElements}</tbody>
			</Table>
		</div>
	);
}
