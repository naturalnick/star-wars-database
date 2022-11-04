import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBar.css";

export default function SearchBar({ isLoading, handleSearch, cancelSearch }) {
	const [input, setInput] = useState("");

	function handleChange(e) {
		setInput(e.target.value);
		if (e.target.value === "") cancelSearch();
	}

	const inputRef = useRef(null);

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
				onClick={() => {
					handleSearch(input);
					focusSearchBar();
				}}
				variant="warning"
			>
				Search
			</Button>
		</InputGroup>
	);
}
