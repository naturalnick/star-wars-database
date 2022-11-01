import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/fonts/Starjhol.ttf";

import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import DataPagination from "./components/DataPagination";

//TODO add page numbers

function App() {
	const [data, setData] = useState({});

	async function getData(url) {
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

	const [pageTotal, setPageTotal] = useState(0);

	async function getPageInfo() {
		let pageCount = 1;
		let atTheEnd = false;
		try {
			while (!atTheEnd) {
				const res1 = await axios.get(
					`https://swapi.dev/api/people/?page=${pageCount}`
				);
				atTheEnd = res1.data.next === null ? true : false;
				pageCount++;
			}
		} catch (error) {
			console.log(error);
		}
		setPageTotal(pageCount - 1);
	}

	useEffect(() => {
		getPageInfo();
	}, []);

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

			setIsLoading(true);
		} catch (error) {
			console.log(error);
		}
	}

	const [input, setInput] = useState("");

	function handleChange(input) {
		if (input === "") {
			cancelSearch();
		} else {
			performSearch(input);
		}
		setInput(input);
	}

	const [isSearching, setIsSearching] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	function cancelSearch() {
		setIsSearching(false);
		setIsLoading(true);
		getData(page.url + page.active);
	}

	function performSearch(text) {
		const url = `https://swapi.dev/api/people/?search=${text}`;
		setIsSearching(true);
		getData(url);
	}

	useEffect(() => {
		getData(page.url + page.active);
	}, [page]);

	console.log("render");

	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar
				value={input}
				handleChange={handleChange}
				isLoading={isLoading}
			/>
			<DataTable chars={data} isLoading={isLoading} />
			<DataPagination
				isSearching={isSearching}
				isLoading={isLoading}
				handlePageTurn={handlePageTurn}
				page={page}
				pageTotal={pageTotal}
			/>
		</div>
	);
}

export default App;
