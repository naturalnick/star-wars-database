import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/fonts/Starjhol.ttf";

import SearchBar from "./components/SearchBar/SearchBar";
import DataTable from "./components/DataTable/DataTable";
import DataPagination from "./components/DataPagination/DataPagination";

function App() {
	const url = {
		pageable: `https://swapi.dev/api/people/?page=`,
		searchable: `https://swapi.dev/api/people/?search=`,
	};

	const [isSearching, setIsSearching] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});

	async function getData(source) {
		try {
			const response = isNaN(source)
				? await axios.get(url.searchable + source)
				: await axios.get(url.pageable + source);
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
		isFirst: true,
		isLast: false,
	});

	async function handlePageTurn(event) {
		try {
			const buttonText = event.target.textContent;
			let newActive;
			if (!Number(buttonText)) {
				newActive =
					buttonText === "Next" ? page.active + 1 : page.active - 1;
			} else {
				newActive = Number(buttonText);
			}
			const res1 = await axios.get(url.pageable + newActive);
			setPage((prevPage) => {
				return {
					...prevPage,
					active: newActive,
					isFirst: res1.data.previous === null ? true : false,
					isLast: res1.data.next === null ? true : false,
				};
			});

			setIsLoading(true);
		} catch (error) {
			console.log(error);
		}
	}

	function handleSearch(text) {
		if (text === "") {
			cancelSearch();
		} else {
			performSearch(text);
		}
	}

	function cancelSearch() {
		setIsSearching(false);
		setIsLoading(true);
		getData(page.active);
	}

	function performSearch(text) {
		setIsSearching(true);
		getData(text);
	}

	useEffect(() => {
		getData(page.active);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar
				handleSearch={handleSearch}
				isLoading={isLoading}
				cancelSearch={cancelSearch}
			/>
			<DataTable chars={data} isLoading={isLoading} />
			<DataPagination
				isSearching={isSearching}
				isLoading={isLoading}
				handlePageTurn={handlePageTurn}
				page={page}
				url={url.pageable}
			/>
		</div>
	);
}

export default App;
