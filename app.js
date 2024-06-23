function calculate() {
  // Получение данных из полей ввода
  let total_people = parseInt(document.getElementById('total_people').value);
  let discounted_people = parseInt(document.getElementById('discounted_people').value);
  let children = parseInt(document.getElementById('children').value);
  let elderly_60_69 = parseInt(document.getElementById('elderly_60_69').value);
  let elderly_70_plus = parseInt(document.getElementById('elderly_70_plus').value);
  let adult_excursion_cost = parseFloat(document.getElementById('adult_excursion_cost').value);
  let children_excursion_cost = parseFloat(document.getElementById('children_excursion_cost').value);
  let discounted_excursion_cost = parseFloat(document.getElementById('discounted_excursion_cost').value);

  // Расчет стоимости билетов
  let ticket_cost_without_discount = 2550;
  const elderly_60_69_discount = ticket_cost_without_discount * 0.2; // 20% скидка для лиц от 60 до 69 лет
  const elderly_70_plus_fixed_cost = 500; // Фиксированная цена для лиц старше 70 лет

  // Расчет общей стоимости
  let total_cost = (total_people * adult_excursion_cost) +
                   (discounted_people * discounted_excursion_cost) +
                   (children * children_excursion_cost) +
                   (elderly_60_69 * elderly_60_69_discount) +
                   (elderly_70_plus * elderly_70_plus_fixed_cost);

  // Отображение результатов
  let popupContent = `
      <div class="popup-content">
          <h2>Результаты</h2>
          <p>Общая стоимость экскурсий: ${total_cost.toFixed(2)}</p>
          <p>Стоимость для взрослых: ${(total_people * adult_excursion_cost).toFixed(2)}</p>
          <p>Количество взрослых: ${total_people}</p>
          <p>Стоимость для детей: ${(children * children_excursion_cost).toFixed(2)}</p>
          <p>Количество детей: ${children}</p>
          <p>Стоимость для льготников: ${(discounted_people * discounted_excursion_cost).toFixed(2)}</p>
          <p>Количество льготников: ${discounted_people}</p>
          <p>Стоимость для людей от 60 до 69 лет: ${(elderly_60_69 * elderly_60_69_discount).toFixed(2)}</p>
          <p>Количество людей от 60 до 69 лет: ${elderly_60_69}</p>
          <p>Стоимость для людей старше 70 лет: ${(elderly_70_plus * elderly_70_plus_fixed_cost).toFixed(2)}</p>
          <p>Количество людей старше 70 лет: ${elderly_70_plus}</p>
      </div>
      <button onclick="goBack()" class="back-button">Назад</button>
  `;
  showPopup('Результаты', popupContent);
}

function showPopup(title, content) {
  let popup = document.getElementById('results');
  popup.innerHTML = content;
  popup.style.display = 'flex';
}


function goToCosts() {
  const totalPeople = document.getElementById('total_people').value;
  const discountedPeople = document.getElementById('discounted_people').value;
  const children = document.getElementById('children').value;
  const elderly60_69 = document.getElementById('elderly_60_69').value;
  const elderly70Plus = document.getElementById('elderly_70_plus').value;

  const queryParams = `?total_people=${totalPeople}&discounted_people=${discountedPeople}&children=${children}&elderly_60_69=${elderly60_69}&elderly_70_plus=${elderly70Plus}`;
  window.location.href = `costs.htm${queryParams}`;
}
function goBack() {
  let popup = document.getElementById('results');
  popup.style.display = 'none';
}



// КОЛИЧЕСТВО УЧАСТНИКОВ
function goToCosts() {
  const totalPeople = document.getElementById('total_people').value;
  const discountedPeople = document.getElementById('discounted_people').value;
  const children = document.getElementById('children').value;
  const elderly60_69 = document.getElementById('elderly_60_69').value;
  const elderly70Plus = document.getElementById('elderly_70_plus').value;

  const queryParams = `?total_people=${totalPeople}&discounted_people=${discountedPeople}&children=${children}&elderly_60_69=${elderly60_69}&elderly_70_plus=${elderly70Plus}`;
  window.location.href = `costs.htm${queryParams}`;
}

//СЧЁТ ДАННЫХ
function calculate() {
  const urlParams = new URLSearchParams(window.location.search);
  const totalPeople = parseInt(urlParams.get('total_people'));
  const discountedPeople = parseInt(urlParams.get('discounted_people'));
  const children = parseInt(urlParams.get('children'));
  const elderly60_69 = parseInt(urlParams.get('elderly_60_69'));
  const elderly70Plus = parseInt(urlParams.get('elderly_70_plus'));

  const adultExcursionCost = parseFloat(document.getElementById('adult_excursion_cost').value);
  const childrenExcursionCost = parseFloat(document.getElementById('children_excursion_cost').value);
  const discountedExcursionCost = parseFloat(document.getElementById('discounted_excursion_cost').value);

  const elderly60_69Cost = (adultExcursionCost * 0.8);
  const elderly70PlusCost = 500;

  const totalCost = (totalPeople * adultExcursionCost) +
                    (discountedPeople * discountedExcursionCost) +
                    (children * childrenExcursionCost) +
                    (elderly60_69 * elderly60_69Cost) +
                    (elderly70Plus * elderly70PlusCost);

  const popupContent = `
      <div class="popup-content">
          <h2>Результаты</h2>
          <p>Общая стоимость экскурсий: ${totalCost.toFixed(2)}</p>
          <p>Стоимость для взрослых: ${(totalPeople * adultExcursionCost).toFixed(2)}</p>
          <p>Количество взрослых: ${totalPeople}</p>
          <p>Стоимость для детей: ${(children * childrenExcursionCost).toFixed(2)}</p>
          <p>Количество детей: ${children}</p>
          <p>Стоимость для льготников: ${(discountedPeople * discountedExcursionCost).toFixed(2)}</p>
          <p>Количество льготников: ${discountedPeople}</p>
          <p>Стоимость для людей от 60 до 69 лет: ${(elderly60_69 * elderly60_69Cost).toFixed(2)}</p>
          <p>Количество людей от 60 до 69 лет: ${elderly60_69}</p>
          <p>Стоимость для людей старше 70 лет: ${(elderly70Plus * elderly70PlusCost).toFixed(2)}</p>
          <p>Количество людей старше 70 лет: ${elderly70Plus}</p>
          <button onclick="goBack()" class="back-button">Назад</button>
      </div>
  `;
  showPopup('Результаты', popupContent);
}

function showPopup(title, content) {
  const popup = document.getElementById('results');
  popup.innerHTML = content;
  popup.style.display = 'flex';
}

function goBack() {
  window.history.back();
}