import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/fonts/Starjhol.ttf";
import "./App.css";

import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import DataPagination from "./components/DataPagination";

function App() {
	const [data, setData] = useState({});

	useEffect(() => {
		async function getData() {
			const response = await axios.get("https://swapi.dev/api/people/");
			console.log(response);
			const data = response.data.results;
			const characters = data.map((character) => {
				return {
					key: character.name,
					name: character.name,
					birth: character.birth_year,
					height: character.height,
					mass: character.mass,
					homeworld: character.homeworld,
					species: character.species,
				};
			});
			setData(characters);
		}
		getData();
	}, []);

	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar />
			<DataTable chars={data} />
			<DataPagination />
		</div>
	);
}

export default App;
