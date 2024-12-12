// script.js
function processURLs() {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    let inputText = inputElement.value.trim(); // Получаем текст из поля ввода
    if (!inputText) {
        alert('Пожалуйста, введите URL!');
        return;
    }

    // Разделяем текст на строки
    let lines = inputText.split(/\r?\n/);

    // Извлекаем последнюю часть каждого URL (после последнего слэша)
    let processedUrls = lines.map(line => {
        let lastSlashIndex = line.lastIndexOf('/');
        return lastSlashIndex === -1 ? '' : line.substring(lastSlashIndex + 1);
    });

    // Объединяем результаты в одну строку через запятую
    let result = processedUrls.join(', ');

    // Отображаем результат в текстовом поле вывода
    outputElement.value = result;
}

function copyResult() {
    const outputElement = document.getElementById('output');
    navigator.clipboard.writeText(outputElement.value); // Копируем текст в буфер обмена
}

// Остальные функции остаются без изменений...

let isDarkMode = false; // Флаг для отслеживания текущего режима

function toggleTheme() {
    if (isDarkMode) {
        document.body.classList.remove('dark-theme'); // Удаляем класс dark-theme
        document.body.classList.add('light-theme');   // Добавляем класс light-theme
        document.getElementById('themeSwitcher').innerText = 'Тёмная тема'; // Меняем текст кнопки
    } else {
        document.body.classList.remove('light-theme'); // Удаляем класс light-theme
        document.body.classList.add('dark-theme');     // Добавляем класс dark-theme
        document.getElementById('themeSwitcher').innerText = 'Светлая тема'; // Меняем текст кнопки
    }
    isDarkMode = !isDarkMode; // Инвертируем флаг
}