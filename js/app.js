// basket.js 3-06-2020
// новий проєкт -- новий кошик
{
	// all buttons
	const buttons = document.querySelectorAll('button');

	buttons.forEach(button => button.addEventListener('click', add));

	// wiev quantity goods
	const result = document.querySelector('#basket-result');

	// view sum
	const sum = document.querySelector('#basket-sum');

	// order
	const order = document.querySelector('#basket-order');

	// click by button #basket-order
	order.addEventListener('click', getOrder);

	// clear
	const clear = document.querySelector('#basket-delete');

	// clear localStorage
	clear.addEventListener('click', clearStorage);

	// reload
	viewSum();

	// reload
	viewQuantity();

	// add to localStorage
	function add() {
		// create array for data
		const data = [];
		// chech localStorage and add data to localStorage
		if (localStorage.getItem('basket') === null) {
			// push object with 3 items to array
			data.push({ name: this.dataset.name, size: this.dataset.size, price: this.dataset.price });
			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(data));

			// reload 
			viewQuantity();
			viewSum();
		} else {
			// load data from localStorage
			const data = JSON.parse(localStorage.getItem('basket'));
			// push object with 3 items to array
			data.push({ name: this.dataset.name, size: this.dataset.size, price: this.dataset.price })
			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(data));

			// reload 
			viewQuantity();
			viewSum();
		}
	}

	// return quantity goods
	function viewQuantity() {
		if (localStorage.getItem('basket') === null) {
			result.innerHTML = 0;
		} else {
			result.innerHTML = JSON.parse(localStorage.getItem('basket')).length;
		}
	}

	// return sum
	function viewSum() {
		if (localStorage.getItem('basket') === null) {
			sum.innerHTML = 0;
		} else {
			sum.innerHTML = JSON.parse(localStorage.getItem('basket')).map(item => item.price).reduce((sum, item) => sum + +item, 0);
		}
	}

	// get order
	function getOrder() {

	}

	// clear localStorage
	function clearStorage() {
		localStorage.clear('basket');

		// reload
		viewSum();
		viewQuantity();
	}
}
// end

// todo: в ідеалі має сумувати однакові товари, або ж ні =)