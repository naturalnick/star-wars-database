import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchBar(props) {
	return (
		<Container className="form-container">
			<Form>
				<Row>
					<Col sm={8}>
						<Form.Control
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
					</Col>
					<Col className="d-grid">
						<Button onClick={props.handleSearch} variant="warning">
							Search
						</Button>
					</Col>
					<Col className="d-grid">
						<Button onClick={props.handleCancel} variant="secondary">
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
}
