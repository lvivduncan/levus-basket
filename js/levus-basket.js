// basket.js 3-06-2020
{
	// wiev quantity goods
	const quantity = document.querySelector('#basket-quantity');

	// view sum
	const sum = document.querySelector('#basket-sum');

	// view selected goods
	const selected = document.querySelector('#basket-goods');

	// all buttons click
	document.querySelectorAll('button').forEach(button => button.addEventListener('click', addGoods));

	// click by button #basket-order
	document.querySelector('#basket-order').addEventListener('click', getOrder);

	// clear localStorage
	document.querySelector('#basket-clear').addEventListener('click', clearStorage);

	// delete goods one by one
	selected.addEventListener('click', e => removeGoods(e));

	// view sum
	viewSum();

	// view quantity
	viewQuantity();

	// view selected goods
	viewSelected();

	// add to localStorage
	function addGoods() {

		// temporary array
		const content = { name: this.dataset.name, size: this.dataset.size, price: this.dataset.price };

		// check localStorage and add data to localStorage
		if (localStorage.getItem('basket') === null) {

			// create array for data
			const data = [];

			// push object with 3 items to array
			data.push(content);

			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(data));

			// reload 
			viewQuantity();
			viewSum();
			viewSelected();
		} else {

			// load data from localStorage
			const data = JSON.parse(localStorage.getItem('basket'));

			// push object with 3 items to array
			data.push(content);

			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(data));

			// reload 
			viewQuantity();
			viewSum();
			viewSelected();
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
			sum.innerHTML =
				JSON.parse(localStorage.getItem('basket'))
					.map(item => item.price)
					.reduce((sum, item) => sum + +item, 0);
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
		viewSelected();
	}

	// view selected goods
	function viewSelected() {
		if (localStorage.getItem('basket') === null) {
			selected.innerHTML = '';
		} else {
			selected.innerHTML =
				JSON.parse(localStorage.getItem('basket'))
					.reduce((sum, item, i) => sum + `<p><i data-id="${i}"></i> ${item.name} - ${item.size} - ${item.price}грн</p>`, '');
		}
	}

	// delete goods from basket
	function removeGoods(e) {
		if (e.target.tagName === 'I') {

			// id goods
			const id = e.target.dataset.id;

			// goods from storage
			const data = JSON.parse(localStorage.getItem('basket'));

			// remove item
			data.splice(id, 1);

			// claer storage or return data to localStorage
			if (data.length === 0) {
				localStorage.removeItem('basket');
			} else {
				localStorage.setItem('basket', JSON.stringify(data));
			}

			// reload
			viewSum();
			viewQuantity();
			viewSelected();
		}
	}
}