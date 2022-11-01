import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/fonts/Starjhol.ttf";

import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import DataPagination from "./components/DataPagination";

function App() {
	const [data, setData] = useState({});

	async function getData(url) {
		console.log("getData");
		try {
			const response = await axios.get(url);
			const data = response.data.results;
			const characters = await Promise.all(
				data.map(async (character) => {
					const res1 = await axios.get(character.homeworld);
					const homeworld = res1.data.name;
					const res2 = await axios.get(character.species);
					const species =
						res2.data.name !== undefined ? res2.data.name : "Human";
					return {
						key: character.name,
						name: character.name,
						birth_year: character.birth_year,
						height: character.height,
						mass: character.mass,
						homeworld: homeworld,
						species: species,
					};
				})
			);
			setData(characters);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	const [page, setPage] = useState({
		active: 1,
		url: `https://swapi.dev/api/people/?page=`,
		isFirst: true,
		isLast: false,
	});

	async function handlePageTurn(event) {
		try {
			const buttonText = event.target.textContent;
			const newActive =
				buttonText === "Next" ? page.active + 1 : page.active - 1;
			const res1 = await axios.get(
				`https://swapi.dev/api/people/?page=${newActive}`
			);
			setPage((prevPage) => {
				return {
					...prevPage,
					active: newActive,
					isFirst: res1.data.previous === null ? true : false,
					isLast: res1.data.next === null ? true : false,
				};
			});
		} catch (error) {
			console.log(error);
		}
	}

	const [isSearching, setIsSearching] = useState(false);

	function handleSearch(input) {
		if (!isSearching) {
			console.log("handleSearch");
			const url = `https://swapi.dev/api/people/?search=${input}`;
			setIsSearching(true);
			getData(url);
		} else {
			setIsSearching(false);
			getData(page.url + page.active);
		}
	}

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log("useEffect");
		getData(page.url + page.active);
	}, [page]);

	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar handleSearch={handleSearch} />
			<DataTable chars={data} isLoading={isLoading} />
			<DataPagination
				isSearching={isSearching}
				isLoading={isLoading}
				handlePageTurn={handlePageTurn}
				page={page}
			/>
		</div>
	);
}

export default App;
