import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchBar(props) {
	return (
		<Form.Control
			className="search-bar"
			type="search"
			placeholder="Search"
			aria-label="Search"
			onChange={(event) => props.handleChange(event.target.value)}
			disabled={props.isLoading}
		/>
	);
}
