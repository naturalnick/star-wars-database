import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/fonts/Starjhol.ttf";
import "./App.css";

import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import TableNav from "./components/TableNav";

function App() {
	return (
		<div className="App">
			<Container>
				<Row>
					<Col>
						<h1>Star Wars Database</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<SearchBar />
					</Col>
				</Row>
				<Row>
					<Col>
						<DataTable />
					</Col>
				</Row>
				<Row className="ms-auto">
					<Col>
						<TableNav />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
