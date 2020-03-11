export default class Data {

tableData = [
			this.createTableData(),
			this.createTableData(),
			this.createTableData(),
			this.createTableData(),
			this.createTableData(),
			this.createTableData(),
			this.createTableData(),
			this.createTableData()
    ];
    
createTableData() {
	return {
		
		date: this.getRandomDate(1514804357000, 1577876357000),
		hits: this.getRandom(0, 5),
		unique: this.getRandom(0, 5),
		registrations: this.getRandom(0, 5),
		demo_registrations: this.getRandom(0, 5),
		conversion: this.getRandom(0, 5),
		deposit: this.getRandom(0, 5),
		ftd: this.getRandom(0, 5),
		deals: this.getRandom(0, 5),
		profit: '$' + this.getRandom(10, 500)
	}
};

getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomDate() {
	let year = this.getRandom(2018, 2020);
	let month = this.getRandom(1, 12);
	let day = this.getRandom(1, 31);
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0'+day;
	}
	const newDate = year + '-' + month + '-' + day;
	return newDate;
};

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
  return [profit ? '$' + total : total]
};

getTotalSumArray = (arr, startArr) => {
	const getKeysFromEl = Object.keys(startArr[0]);
	const [, ...keysArr] = getKeysFromEl;
	const newKeys = keysArr.map((el) => {
		return this.getSumForEachColumn(arr, el);
	});
	newKeys.unshift('Total');
	return newKeys;
};
}
