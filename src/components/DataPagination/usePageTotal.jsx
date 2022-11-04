import { useState, useEffect } from "react";
import axios from "axios";

function usePageTotal(url) {
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

	return pageTotal;
}

export default usePageTotal;
