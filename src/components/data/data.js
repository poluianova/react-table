export default class Data {
	
	getResourse = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, recieved ${res.status}`)
		}
		const body = await res.json();
		return body;
	}

	getData = async () => {
		const res = await this.getResourse('https://poluianova.github.io/data.js');
		return res.map(this.transformData);
	}
	
	transformData = (data) => {
		return {
		date: data.date,
		hits: data.hits,
		unique: data.unique,
		registrations: data.registrations,
		demo_registrations: data.demo_registrations,
		conversion: data.conversion,
		deposit: data.deposit,
		ftd: data.ftd,
		deals: data.deals,
		profit: '$' + data.profit
	}
	}
	
getSumForEachColumn = (data, key) => {
	let total = 0;
	const profit = key === 'profit';
	data.forEach(item => {
		if (profit) {
  		total += Number(item[key].slice(1));
  		return total;
	}
    total += item[key];
});
return [profit ? '$' + total : total];
}

getTotalSumArray = (arr, startArr) => {
	const getKeysFromEl = Object.keys(startArr[0]);
	const [, ...keysArr] = getKeysFromEl;
	const newKeys = keysArr.map((el) => {
		return this.getSumForEachColumn(arr, el);
	});
	newKeys.unshift('Total');
	return newKeys;
}
}