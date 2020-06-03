// basket.js 3-06-2020
{
	// wiev quantity goods
	const quantity = document.querySelector('#basket-quantity');

	// view sum
	const sum = document.querySelector('#basket-sum');

	// view selected goods
	const selected = document.querySelector('#basket-goods');

	// all buttons click
	document.querySelectorAll('button').forEach(button => button.addEventListener('click', add));

	// click by button #basket-order
	document.querySelector('#basket-order').addEventListener('click', getOrder);

	// clear localStorage
	document.querySelector('#basket-clear').addEventListener('click', clearStorage);

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
			quantity.innerHTML = 0;
		} else {
			quantity.innerHTML = JSON.parse(localStorage.getItem('basket')).length;
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