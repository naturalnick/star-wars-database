import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/fonts/Starjhol.ttf";

import SearchBar from "./components/SearchBar/SearchBar";
import DataTable from "./components/DataTable/DataTable";
import DataPagination from "./components/DataPagination/DataPagination";

function App() {
	const [isSearching, setIsSearching] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [data, setData] = useState({});
	const [page, setPage] = useState({
		active: 1,
		isFirst: true,
		isLast: false,
	});

	useEffect(() => {
		getData({ page: page.active });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page.active]);

	const url = {
		pageable: `https://swapi.dev/api/people/?page=`,
		searchable: `https://swapi.dev/api/people/?search=`,
	};

	async function getData({ query = "", page = undefined }) {
		try {
			let response;
			if (query !== "") {
				setIsSearching(true);
				response = await axios.get(url.searchable + query);
			} else if (page !== undefined) {
				setIsLoading(true);
				response = await axios.get(url.pageable + page);
				setPage((prevPage) => {
					return {
						...prevPage,
						isFirst: response.data.previous === null ? true : false,
						isLast: response.data.next === null ? true : false,
					};
				});
			} else {
				console.error("Incorrect parameters passed");
			}
			const characters = response.data.results;
			for (const character of characters) {
				character.key = character.name;
				character.homeworld = await getHomeworld(character.homeworld);
				character.species = await getSpecies(character.species);
			}
			setData(characters);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function getHomeworld(url) {
		return (await axios.get(url)).data.name;
	}

	async function getSpecies(url) {
		const response = await axios.get(url);
		return response === undefined ? "Human" : response.data.name;
	}

	function cancelSearch() {
		setIsSearching(false);
		setIsLoading(true);
		getData({ page: page.active });
	}

	function handlePageTurn(number) {
		setPage((prevPage) => {
			return {
				...prevPage,
				active: number,
			};
		});
	}

	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar
				getData={getData}
				isLoading={isLoading}
				cancelSearch={cancelSearch}
			/>
			<DataTable chars={data} isLoading={isLoading} />
			<DataPagination
				page={page}
				url={url.pageable}
				isSearching={isSearching}
				handlePageTurn={handlePageTurn}
			/>
		</div>
	);
}

export default App;
