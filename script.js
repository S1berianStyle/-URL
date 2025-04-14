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
  const fromUserIdInput = document.getElementById("fromUserId");
  const clientIdsInput = document.getElementById("clientIds");
  let resultTransfer = document.getElementById("resultTransfer");
  toUserIdInput.value = "";
  fromUserIdInput.value = "";
  clientIdsInput.value = "";
  resultTransfer.value = "";
}

function clearFieldsTransferLawyer() {
  const toUserIdLawyerInput = document.getElementById("toUserIdLawyer");
  const fromUserIdLawyerInput = document.getElementById("fromUserIdLawyer");
  const clientIdsLawyerInput = document.getElementById("clientIdsLawyer");
  let resultTextLawyer = document.getElementById("resultTransferLawyer");
  toUserIdLawyerInput.value = "";
  fromUserIdLawyerInput.value = "";
  clientIdsLawyerInput.value = "";
  resultTextLawyer.value = "";
}

function transferDoctor() {
  const fromUserIdInput = document.getElementById("fromUserId");
  const toUserIdInput = document.getElementById("toUserId");
  const clientIdsInput = document.getElementById("clientIds");

  const fromUserId = fromUserIdInput.value;
  const toUserId = toUserIdInput.value;
  const clientIds = clientIdsInput.value.split(/\r?\n/).join(", ");

  let resultText = `DELETE FROM crm_client_user WHERE active = 0 AND user_id = ${toUserId} AND client_id IN (${clientIds});

UPDATE crm_client_user SET user_id = ${toUserId}, date_start = NOW()
WHERE active = 1 
AND user_id = ${fromUserId}
AND client_id IN (${clientIds});

UPDATE crm_calendar SET user_id = ${toUserId}, TYPE = 2
WHERE status = 1 
AND user_id = ${fromUserId}
AND client_id IN (${clientIds});`;

  document.getElementById("resultTransfer").value = resultText;
}

function transferLawyer() {
  const fromUserIdLawyerInput = document.getElementById("fromUserIdLawyer");
  const toUserIdLawyerInput = document.getElementById("toUserIdLawyer");
  const clientIdsLawyerInput = document.getElementById("clientIdsLawyer");

  const fromUserIdLawyer = fromUserIdLawyerInput.value;
  const toUserIdLawyer = toUserIdLawyerInput.value;
  const clientIdsLawyer = clientIdsLawyerInput.value.split(/\r?\n/).join(", ");

  let resultTextLawyer = `DELETE FROM crm_client_user WHERE active = 0 AND user_id = ${toUserIdLawyer} AND client_id IN (${clientIdsLawyer});

UPDATE crm_client_user SET user_id = ${toUserIdLawyer}, date_start = NOW()
WHERE active = 1 
AND user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});

UPDATE crm_calendar SET user_id = ${toUserIdLawyer}, TYPE = 3
WHERE status = 1 
AND user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});

UPDATE crm_client_subpoena SET user_id = ${toUserIdLawyer}
WHERE user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});

UPDATE crm_court SET user_id = ${toUserIdLawyer}
WHERE user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});`;

  document.getElementById("resultTransferLawyer").value = resultTextLawyer;
}

// Остальные функции остаются без изменений...

let isDarkMode = true; // Флаг для отслеживания текущего режима

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

// Функция для форматирования даты в нужный формат (дд.мм.гг чч:мм:сс)
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// Функция для форматирования даты в нужный формат (дд.мм.гг чч:мм:сс)
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// Функция для очистки устаревших записей (старше 2 дней)
function cleanupOldRecords() {
  const now = new Date();
  const records = JSON.parse(localStorage.getItem("transferRecords") || "[]");

  const filteredRecords = records.filter((record) => {
    const recordDate = new Date(record.timestamp);
    const diffDays = (now - recordDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 2;
  });

  localStorage.setItem("transferRecords", JSON.stringify(filteredRecords));
}

// Функция для добавления новой записи
function addRecord(type, resultText) {
  cleanupOldRecords(); // Сначала очищаем старые записи

  const now = new Date();
  const formattedDate = formatDate(now);

  const newRecord = {
    type: type,
    date: formattedDate,
    content: resultText,
    timestamp: now.getTime(),
  };

  const records = JSON.parse(localStorage.getItem("transferRecords") || "[]");
  records.push(newRecord);
  localStorage.setItem("transferRecords", JSON.stringify(records));
}

// Модифицированные функции transferDoctor и transferLawyer
function transferDoctor() {
  const fromUserIdInput = document.getElementById("fromUserId");
  const toUserIdInput = document.getElementById("toUserId");
  const clientIdsInput = document.getElementById("clientIds");

  const fromUserId = fromUserIdInput.value;
  const toUserId = toUserIdInput.value;
  const clientIds = clientIdsInput.value.split(/\r?\n/).join(", ");

  let resultText = `DELETE FROM crm_client_user WHERE active = 0 AND user_id = ${toUserId} AND client_id IN (${clientIds});

UPDATE crm_client_user SET user_id = ${toUserId}, date_start = NOW()
WHERE active = 1 
AND user_id = ${fromUserId}
AND client_id IN (${clientIds});

UPDATE crm_calendar SET user_id = ${toUserId}, TYPE = 2
WHERE status = 1 
AND user_id = ${fromUserId}
AND client_id IN (${clientIds});`;

  document.getElementById("resultTransfer").value = resultText;

  // Добавляем запись в историю
  addRecord("doctor", resultText);
}

function transferLawyer() {
  const fromUserIdLawyerInput = document.getElementById("fromUserIdLawyer");
  const toUserIdLawyerInput = document.getElementById("toUserIdLawyer");
  const clientIdsLawyerInput = document.getElementById("clientIdsLawyer");

  const fromUserIdLawyer = fromUserIdLawyerInput.value;
  const toUserIdLawyer = toUserIdLawyerInput.value;
  const clientIdsLawyer = clientIdsLawyerInput.value.split(/\r?\n/).join(", ");

  let resultTextLawyer = `DELETE FROM crm_client_user WHERE active = 0 AND user_id = ${toUserIdLawyer} AND client_id IN (${clientIdsLawyer});

UPDATE crm_client_user SET user_id = ${toUserIdLawyer}, date_start = NOW()
WHERE active = 1 
AND user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});

UPDATE crm_calendar SET user_id = ${toUserIdLawyer}, TYPE = 3
WHERE status = 1 
AND user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});

UPDATE crm_client_subpoena SET user_id = ${toUserIdLawyer}
WHERE user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});

UPDATE crm_court SET user_id = ${toUserIdLawyer}
WHERE user_id = ${fromUserIdLawyer}
AND client_id IN (${clientIdsLawyer});`;

  document.getElementById("resultTransferLawyer").value = resultTextLawyer;

  // Добавляем запись в историю
  addRecord("lawyer", resultTextLawyer);
}

// Функция для отображения истории
function showHistory() {
  cleanupOldRecords();
  const records = JSON.parse(localStorage.getItem("transferRecords") || "[]");

  // Создаем модальное окно для отображения истории
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  // Контейнер для содержимого
  const content = document.createElement("div");
  content.style.backgroundColor = "white";
  content.style.padding = "20px";
  content.style.borderRadius = "8px";
  content.style.maxWidth = "80%";
  content.style.maxHeight = "80vh";
  content.style.overflowY = "auto";

  // Заголовок и кнопка закрытия
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "15px";

  const title = document.createElement("h2");
  title.textContent = "История операций (хранится 2 дня)";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Закрыть";
  closeBtn.onclick = () => document.body.removeChild(modal);

  header.appendChild(title);
  header.appendChild(closeBtn);
  content.appendChild(header);

  // Сортируем записи по дате (новые сверху)
  records.sort((a, b) => b.timestamp - a.timestamp);

  // Добавляем записи
  if (records.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "История операций пуста";
    content.appendChild(emptyMsg);
  } else {
    records.forEach((record) => {
      const separator = document.createElement("div");
      separator.textContent = `------------------------------------"${record.date}"------------------------------------`;
      separator.style.margin = "15px 0 5px 0";
      separator.style.fontWeight = "bold";
      separator.style.textAlign = "center";
      content.appendChild(separator);

      const recordContent = document.createElement("pre");
      recordContent.textContent = record.content;
      recordContent.style.whiteSpace = "pre-wrap";
      recordContent.style.backgroundColor = "#f8f8f8";
      recordContent.style.padding = "10px";
      recordContent.style.borderRadius = "4px";
      content.appendChild(recordContent);
    });
  }

  modal.appendChild(content);
  document.body.appendChild(modal);
}

// Добавляем кнопку для показа истории, если её нет
function initHistoryButton() {
  if (!document.getElementById("showHistoryBtn")) {
    const btn = document.createElement("button");
    btn.id = "showHistoryBtn";
    btn.textContent = "Показать историю операций";
    btn.onclick = showHistory;
    btn.style.margin = "10px";
    btn.style.padding = "8px 15px";
    btn.style.backgroundColor = "#4CAF50";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";

    // Добавляем кнопку в подходящее место на странице
    const container = document.querySelector("body"); // или другой подходящий элемент
    container.appendChild(btn);
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  initHistoryButton();

  // Можно добавить интервал для автоматической очистки (например, раз в час)
  setInterval(cleanupOldRecords, 3600000);
});
