// 8-06-2020
$('.button').each(function () {
  $(this).click(addToBusket);
});

// додаємо у кошик
function addToBusket() {
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
}