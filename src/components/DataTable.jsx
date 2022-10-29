import React from "react";
import Table from "react-bootstrap/Table";

export default function DataTable(props) {
	return (
		<Table className="table" striped bordered hover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Birth Date</th>
					<th>Height</th>
					<th>Mass</th>
					<th>Homeworld</th>
					<th>Species</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>adfsd</td>
					<td>Masddrk</td>
					<td>Ottsdgfo</td>
					<td>Wgsfg</td>
					<td>Wgsfg</td>
					<td>Wgsfg</td>
				</tr>
			</tbody>
		</Table>
	);
}
