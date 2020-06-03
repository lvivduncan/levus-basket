// basket.js 3-06-2020
// новий проєкт -- новий кошик
{
	// all buttons
	const buttons = document.querySelectorAll('button');

	// data-array 
	const data = [];

	buttons.forEach(button => button.addEventListener('click', add));

	// add to localStorage
	function add() {
		// chech localStorage and add data to localStorage
		if (localStorage.getItem('basket') === null) {
			// push object with 3 items to array
			data.push({ name: this.dataset.name, size: this.dataset.size, price: this.dataset.price });
			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(data))
		} else {
			// load data from localStorage
			const loadData = JSON.parse(localStorage.getItem('basket'));
			// push
			loadData.push({ name: this.dataset.name, size: this.dataset.size, price: this.dataset.price })
			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(loadData))
		}
	}
}
// end

// todo: в ідеалі має сумувати однакові товари