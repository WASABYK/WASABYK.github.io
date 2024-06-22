function countMembers() {
    var param1 = document.getElementById('param1').value.trim();
    var param2 = document.getElementById('param2').value.trim();
  
    if (param1 === '' || param2 === '') {
      alert('Пожалуйста, введите оба параметра.');
      return;
    }
  
    // Формируем запрос к нашему Flask приложению (замените на свой URL)
    var url = 'https://your-flask-app-url/count?param1=' + encodeURIComponent(param1) + '&param2=' + encodeURIComponent(param2);
  
    // Выполняем GET запрос
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById('result').textContent = 'Количество участников: ' + data.count;
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      });
  }
  