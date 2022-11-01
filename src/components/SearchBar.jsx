import React, { useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchBar(props) {
	const [input, setInput] = useState("");

	function handleChange(event) {
		setInput(event.target.value);
	}
	return (
		<InputGroup>
			<Form.Control
				id="search"
				type="search"
				placeholder="Search"
				aria-label="Search"
				onChange={handleChange}
			/>
			<Button
				className="search-button"
				onClick={() => props.handleSearch(input)}
				variant="warning"
			>
				Search
			</Button>
		</InputGroup>
	);
}
