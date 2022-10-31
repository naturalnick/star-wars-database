import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchBar(props) {
	const [input, setInput] = useState("");

	function handleChange(event) {
		setInput(event.target.value);
	}
	return (
		<Container className="form-container">
			<Form>
				<Row>
					<Col xs={8}>
						<Form.Control
							type="search"
							placeholder="Search"
							aria-label="Search"
							onChange={handleChange}
						/>
					</Col>
					<Col xs={2} className="d-grid">
						<Button
							onClick={() => props.handleSearch(input)}
							variant="warning"
						>
							Search
						</Button>
					</Col>
					<Col xs={2} className="d-grid">
						<Button onClick={props.handleCancel} variant="secondary">
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
}
