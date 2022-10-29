import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";

export default function TableNav() {
	return (
		<Stack direction="horizontal">
			<Button variant="light">Previous</Button>
			<Button variant="light" className="ms-auto">
				Next
			</Button>
		</Stack>
	);
}
