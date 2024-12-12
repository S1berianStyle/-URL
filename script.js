function processURLs() {
  const inputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");

  let inputText = inputElement.value.trim(); // Получаем текст из поля ввода
  if (!inputText) {
    // alert('Пожалуйста, введите URL или ID!');
    return;
  }

  // Разделяем текст на строки
  let lines = inputText.split(/\r?\n/);

  // Обрабатываем каждую строку
  let processedUrls = lines.map((line) => {
    line = line.trim(); // Убираем пробелы
    if (/^\d+$/.test(line)) {
      // Если строка содержит только цифры, возвращаем её как есть
      return line;
    } else {
      // Если это ссылка, извлекаем последнюю часть после последнего слэша
      let lastSlashIndex = line.lastIndexOf("/");
      return lastSlashIndex === -1 ? "" : line.substring(lastSlashIndex + 1);
    }
  });

  // Удаляем пустые элементы, если есть
  processedUrls = processedUrls.filter((item) => item);

  // Объединяем результаты в одну строку через запятую
  let result = processedUrls.join(", ");

  // Отображаем результат в текстовом поле вывода
  outputElement.value = result;
}

function copyResult() {
  const outputElement = document.getElementById("output");
  navigator.clipboard.writeText(outputElement.value); // Копируем текст в буфер обмена
}

function clearFields() {
  const inputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");
  inputElement.value = "";
  outputElement.value = "";
}

// Остальные функции остаются без изменений...

let isDarkMode = false; // Флаг для отслеживания текущего режима

function toggleTheme() {
  const body = document.body;
  const themeSwitcher = document.getElementById("themeSwitcher");
  const headings = document.querySelectorAll("h1, label");

  if (isDarkMode) {
    body.classList.remove("dark-theme"); // Удаляем класс dark-theme
    body.classList.add("light-theme"); // Добавляем класс light-theme
    themeSwitcher.innerText = "Тёмная тема"; // Меняем текст кнопки

    headings.forEach((heading) => {
      heading.style.color = "#000"; // Цвет текста для светлой темы
    });
  } else {
    body.classList.remove("light-theme"); // Удаляем класс light-theme
    body.classList.add("dark-theme"); // Добавляем класс dark-theme
    themeSwitcher.innerText = "Светлая тема"; // Меняем текст кнопки

    headings.forEach((heading) => {
      heading.style.color = "#fff"; // Цвет текста для тёмной темы
    });
  }
  isDarkMode = !isDarkMode; // Инвертируем флаг
}
