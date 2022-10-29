import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/fonts/Starjhol.ttf";
import "./App.css";

import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import DataPagination from "./components/DataPagination";

function App() {
	const [data, setData] = useState();

	useEffect(() => {
		axios
			.get("https://swapi.dev/api/people/")
			.then((response) => {
				setData(response.data.results);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	console.log(data);

	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar />
			{/* <DataTable chars={data} /> */}
			<DataPagination />
		</div>
	);
}

export default App;
