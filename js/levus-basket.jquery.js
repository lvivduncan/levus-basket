// 8-06-2020

// клікаємо на кнопку замовлення
$('.button').each(function () {
  $(this).click(addToBasket);
});

// видаляємо по 1 товару
$('#basket-goods').click(function(e){
  deleteProduct(e);
});

// очистка кошика
$('#basket-clear').click(clearStorage);

// показуємо кількість товарів у кошикові
viewQuantity();

// сума
viewSum();

// товари
viewProducts();

/* ///////////
функції кошика
/////////// */

// додаємо у кошик
function addToBasket() {

  // тимчасовий масив з об'єктами
  const content = {
    name: $(this).data('name'),
    size: $(this).data('size'),
    price: $(this).data('price')
  };

  // працюємо зі сховищем
  if (localStorage.getItem('basket') === null) {

    // пустий масив для додавання даних з кнопок
    const data = [];

    // складаємо дані у масив
    data.push(content);

    // надсилаємо у сховище
    localStorage.setItem('basket', JSON.stringify(data));
  } else {

    // масив з локалстореджа
    const data = JSON.parse(localStorage.getItem('basket'));

    // складаємо дані
    data.push(content);

    // повертаємо у сховище
    localStorage.setItem('basket', JSON.stringify(data));
  }

  // оновлюємо кількість товарів у кошикові
  viewQuantity();

  // оновлюємо суму
  viewSum();

  // товари
  viewProducts();
}

// видаляємо товар
function deleteProduct(e){
  if(e.target.tagName === 'I'){
    const data = JSON.parse(localStorage.getItem('basket'));
    data.splice(e.target.dataset.id, 1);
    
    if (data.length === 0) {
      localStorage.removeItem('basket');
    } else {
      localStorage.setItem('basket', JSON.stringify(data));
    }
  
    // оновлюємо
    viewSum();
    viewQuantity();
    viewProducts();
  }
}

// очистка кошика
function clearStorage() {
  localStorage.removeItem('basket');

  // оновлюємо кількість товарів у кошикові
  viewQuantity();

  // оновлюємо суму
  viewSum();

  // товари
  viewProducts();
}

// кількість товарів 
function viewQuantity() {
  if (localStorage.getItem('basket')) {
    $('#basket-quantity').text(JSON.parse(localStorage.getItem('basket')).length);
  } else {
    $('#basket-quantity').text(0);
  }
}

// сума 
function viewSum() {
  let total = 0;

  if (localStorage.getItem('basket')) {
    JSON.parse(localStorage.getItem('basket'))
      .map(function (item) {
        return item.price;
      })
      .map(function (sum) {
        total += +sum;
        return total;
      });
  }

  $('#basket-sum').text(total);
}

// товари у кошикові
function viewProducts() {
  let goods = '';

  if (localStorage.getItem('basket')) {
    JSON.parse(localStorage.getItem('basket'))
      .map(function (item,i) {
        goods += `<p><i data-id="${i}"></i> ${item.name} - ${item.size} - ${item.price}грн</p>`;
        return goods;
      });

    $('#basket-goods').html(goods);
  } else {
    $('#basket-goods').html('');
  }

}