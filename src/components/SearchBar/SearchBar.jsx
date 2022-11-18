import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBar.css";

export default function SearchBar({ getData, isLoading, cancelSearch }) {
	const [input, setInput] = useState("");
	const inputRef = useRef(null);

	function handleChange(e) {
		setInput(e.target.value);
		if (e.target.value === "") cancelSearch();
	}

	function handleSearch() {
		getData({ query: input });
		focusSearchBar();
	}

	function focusSearchBar() {
		inputRef.current.focus();
	}

	return (
		<InputGroup className="search-bar">
			<Form.Control
				type="search"
				placeholder="Search"
				ref={inputRef}
				onChange={handleChange}
				disabled={isLoading}
				value={input}
			/>
			<Button
				className="search-btn"
				onClick={handleSearch}
				variant="warning"
			>
				Search
			</Button>
		</InputGroup>
	);
}
