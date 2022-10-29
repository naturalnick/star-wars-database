import React from "react";

import "./assets/fonts/Starjhol.ttf";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";

function App() {
	return (
		<div className="App">
			<h1>Star Wars Database</h1>
			<SearchBar />
			<DataTable />
		</div>
	);
}

export default App;
