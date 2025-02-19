function processURLs() {
  const inputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");
  const resultTransfer = document.getElementById("resultTransfer");
  const outputElement2 = document.getElementById("outputTransfer");
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
  outputElement1.value = result;
  outputElement2.value = result;
}

function copyResult() {
  const outputElement = document.getElementById("output");
  navigator.clipboard.writeText(outputElement.value); // Копируем текст в буфер обмена
}

function copyResultTransfer() {
  const outputElement2 = document.getElementById("resultTransfer");
  navigator.clipboard.writeText(outputElement2.value); // Копируем текст в буфер обмена

  //const outputElement1 = document.getElementById("resultTransfer");
  //outputElement1.value = "";
}

function copyResultTransferLawyer() {
  const outputElement2 = document.getElementById("resultTransferLawyer");
  navigator.clipboard.writeText(outputElement2.value); // Копируем текст в буфер обмена

  //const outputElement1 = document.getElementById("resultTransfer");
  //outputElement1.value = "";
}

function clearFields() {
  const inputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");
  inputElement.value = "";
  outputElement.value = "";
}

function clearFieldsTransfer() {
  const toUserIdInput = document.getElementById("toUserId");
  const fromUserIdInput = document.getElementById("fromUserId")
  const clientIdsInput = document.getElementById("clientIds")
  let resultTransfer = document.getElementById("resultTransfer");
  toUserIdInput.value = "";
  fromUserIdInput.value = "";
  clientIdsInput.value = "";
  resultTransfer.value = "";
}

function clearFieldsTransferLawyer() {
  const toUserIdLawyerInput = document.getElementById("toUserIdLawyer");
  const fromUserIdLawyerInput = document.getElementById("fromUserIdLawyer")
  const clientIdsLawyerInput = document.getElementById("clientIdsLawyer")
  let resultTextLawyer = document.getElementById("resultTransferLawyer");
  toUserIdLawyerInput.value = "";
  fromUserIdLawyerInput.value = "";
  clientIdsLawyerInput.value = "";
  resultTextLawyer.value = "";
}

function transferDoctor(){

    const fromUserIdInput = document.getElementById("fromUserId");
    const toUserIdInput = document.getElementById("toUserId");
    const clientIdsInput = document.getElementById("clientIds");

    const fromUserId = fromUserIdInput.value;
    const toUserId = toUserIdInput.value;
    const clientIds = clientIdsInput.value.split(",").map(id => id.trim()).join(", ");

    let resultText = `update crm_client_user SET user_id = ${toUserId}, date_start = NOW()
where active = 1 
AND user_id = ${fromUserId}
AND client_id IN (${clientIds});
update crm_calendar SET user_id = ${toUserId}, TYPE = 2
WHERE status = 1 
AND user_id = ${fromUserId}
AND client_id IN (${clientIds});`

//document.getElementById('resultTransfer').innerHTML = `${resultText}`

document.getElementById('resultTransfer').value = resultText;

}

function transferLawyer(){

  const fromUserIdLawyerInput = document.getElementById("fromUserIdLawyer");
  const toUserIdLawyerInput = document.getElementById("toUserIdLawyer");
  const clientIdsLawyerInput = document.getElementById("clientIdsLawyer");

  const fromUserIdLawyer = fromUserIdLawyerInput.value;
  const toUserIdLawyer = toUserIdLawyerInput.value;
  const clientIdsLawyer = clientIdsLawyerInput.value.split(",").map(id => id.trim()).join(", ");

  let resultTextLawyer = `update crm_client_user SET user_id = ${toUserIdLawyer}, date_start = NOW()
where active = 1 
AND user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});
update crm_calendar SET user_id = ${toUserIdLawyer}, TYPE = 3
WHERE status = 1 
AND user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});
update crm_client_subpoena SET user_id = ${toUserIdLawyer}
WHERE user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});
update crm_court SET user_id = ${toUserIdLawyer}
WHERE user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});`

document.getElementById('resultTransferLawyer').value = resultTextLawyer;

}


// Остальные функции остаются без изменений...

let isDarkMode = false; // Флаг для отслеживания текущего режима

function toggleTheme() {
  const body = document.body;

  const sectionHeader = document.querySelector(".section_header");
  const buttonNavs = document.querySelectorAll(".button_nav");
  const titleLabels = document.querySelectorAll(".title_label");

  if (isDarkMode) {
    body.classList.remove("dark-theme"); // Удаляем класс dark-theme
    body.classList.add("light-theme"); // Добавляем класс light-theme

    sectionHeader.style.backgroundColor = "#ece4de"; // Цвет фона для светлой темы

    buttonNavs.forEach((button) => {
      button.style.color = "#333"; // Цвет текста кнопок навигации для светлой темы
    });

    titleLabels.forEach((label) => {
      label.style.color = "#333"; // Цвет текста заголовков для светлой темы
    });
  } else {
    body.classList.remove("light-theme"); // Удаляем класс light-theme
    body.classList.add("dark-theme"); // Добавляем класс dark-theme

    sectionHeader.style.backgroundColor = "#1A1919"; // Цвет фона для тёмной темы

    buttonNavs.forEach((button) => {
      button.style.color = "#f5f5f5"; // Цвет текста кнопок навигации для тёмной темы
    });

    titleLabels.forEach((label) => {
      label.style.color = "#f5f5f5"; // Цвет текста заголовков для тёмной темы
    });
  }
  isDarkMode = !isDarkMode; // Инвертируем флаг
}
