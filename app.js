function calculate() {
  // Получение данных из полей ввода
  let total_people = parseInt(document.getElementById('total_people').value);
  let discounted_people = parseInt(document.getElementById('discounted_people').value);
  let children = parseInt(document.getElementById('children').value);
  let elderly = parseInt(document.getElementById('elderly').value);
  let adult_excursion_cost = parseFloat(document.getElementById('adult_excursion_cost').value);
  let children_excursion_cost = parseFloat(document.getElementById('children_excursion_cost').value);
  let discounted_excursion_cost = parseFloat(document.getElementById('discounted_excursion_cost').value);

  // Проверка на положительность значений
  if (total_people <= 0 || discounted_people <= 0 || children <= 0 || elderly <= 0) {
      showPopup('Ошибка', 'Значения должны быть больше нуля');
      return;
  }

  // Расчет стоимости билетов
  let ticket_cost_without_discount = 500;

  // Расчет общей стоимости
  let total_cost = (total_people * adult_excursion_cost) +
                   (discounted_people * discounted_excursion_cost) +
                   (children * children_excursion_cost) +
                   (elderly * ticket_cost_without_discount);

  // Отображение результатов
  let popupContent = `
      <div class="popup-content">
          <h2>Результаты</h2>
          <p>Общая стоимость экскурсий: ${total_cost}</p>
          <p>Стоимость для взрослых: ${total_people * adult_excursion_cost}</p>
          <p>Количество взрослых: ${total_people}</p>
          <p>Стоимость для детей: ${children * children_excursion_cost}</p>
          <p>Количество детей: ${children}</p>
          <p>Стоимость для льготников: ${discounted_people * discounted_excursion_cost}</p>
          <p>Количество льготников: ${discounted_people}</p>
          <p>Стоимость для людей старше 70 лет: ${elderly * ticket_cost_without_discount}</p>
          <p>Количество людей старше 70 лет: ${elderly}</p>
      </div>
  `;
  showPopup('Результаты', popupContent);
}

function showPopup(title, content) {
  let popup = document.getElementById('results');
  popup.innerHTML = content;
  popup.style.display = 'flex';
}

