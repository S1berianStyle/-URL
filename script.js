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

isHistory = false;

// Функция для отображения истории
function showHistory() {
  cleanupOldRecords();
  const records = JSON.parse(localStorage.getItem("transferRecords") || "[]");

  // Создаем модальное окно для отображения истории
  const modal = document.createElement("div");
  modal.id = "history";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  // Контейнер для содержимого
  const content = document.createElement("div");
  content.id = "content";
  content.style.position = "fixed";
  content.style.padding = "20px";
  content.style.borderRadius = "8px";
  content.style.maxWidth = "80%";
  content.style.maxHeight = "80vh";
  content.style.overflowY = "auto";

  if (isDarkMode) {
    content.style.backgroundColor = "rgb(42, 42, 42)";
  } else {
    content.style.backgroundColor = "white";
  }

  // Заголовок и кнопка закрытия
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "15px";
  header.style.position = "sticky";
  header.style.top = "-20px";

  if (isDarkMode) {
    header.style.backgroundColor = "rgb(42, 42, 42)";
  } else {
    header.style.backgroundColor = "rgb(255, 255, 255)";
  }
  header.style.padding = "10px";
  header.style.margin = "0px";
  const title = document.createElement("h2");
  title.textContent = "История операций (хранится 2 дня)";

  // Кнопка закрытия
  const closeBtn = document.createElement("img");
  closeBtn.src = "exit.svg";
  header.append(closeBtn);
  closeBtn.style.height = "20px";

  // Добавляем стили для анимации
  closeBtn.style.transition = "all 1.11s ease-in-out";

  // Добавляем стили для анимации
  closeBtn.style.transition = "all 0.2s ease-in-out";
  closeBtn.style.position = "relative"; // Для эффекта разлёта частиц

  // Анимация при наведении (по часовой стрелке)
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.transform = "rotate(360deg) scale(1.7)";
  });

  // Возврат при уходе курсора
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.transform = "rotate(0) scale(1)";
  });

  // Анимация при нажатии (против часовой стрелки)
  closeBtn.addEventListener("mousedown", () => {
    closeBtn.style.transform = "rotate(-90deg) scale(0.8)";
  });

  // ВЗРЫВ при отпускании! 💥
  closeBtn.addEventListener("mouseup", () => {
    // 1. Сначала прячем кнопку
    closeBtn.style.opacity = "0";
    closeBtn.style.transform = "rotate(-180deg) scale(0)";

    // 2. Создаём эффект взрыва (частицы)
    createExplosionEffect(closeBtn);

    // 3. Через 1 секунду возвращаем кнопку (если нужно)
    setTimeout(() => {
      closeBtn.style.opacity = "1";
      closeBtn.style.transform = "rotate(0) scale(1)";
    }, 1000);
  });

  // Функция для создания эффекта взрыва (разлёт частиц)
  function createExplosionEffect(element) {
    const particles = 50; // Количество частиц
    const { left, top, width, height } = element.getBoundingClientRect();
    const centerX = left + width / 100;
    const centerY = top + height / 100;

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.width = "6px";
      particle.style.height = "6px";
      particle.style.backgroundColor = getRandomColor();
      particle.style.borderRadius = "50%";
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1000";

      document.body.appendChild(particle);

      // Анимация разлёта частиц
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 150;
      const duration = 1.5 + Math.random() * 1.5;

      particle.animate(
        [
          { transform: "translate(0, 0)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * distance}px, ${
              Math.sin(angle) * distance
            }px)`,
            opacity: 0,
          },
        ],
        {
          duration: duration * 1000,
          easing: "cubic-bezier(0, 0.8, 0.2, 1)",
          fill: "forwards",
        }
      );

      // Удаляем частицу после анимации
      setTimeout(() => particle.remove(), duration * 1000);
    }
  }

  // Рандомный цвет для частиц
  function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F5"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  closeBtn.onclick = () => document.body.removeChild(modal);
  isHistory = true;

  closeBtn.addEventListener("mouseover", function () {
    closeBtn.style.cursor = "pointer";
  });

  closeBtn.addEventListener("click", function () {
    isHistory = false;
    modal.remove(modal);
    document.body.style.overflow = "visible";
  });

  title.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  closeBtn.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  if (isDarkMode) {
    title.style.color = "white";
    closeBtn.style.color = "white";
  } else {
    title.style.color = "black";
    closeBtn.style.color = "black";
  }

  header.appendChild(title);
  header.appendChild(closeBtn);
  content.appendChild(header);

  modal.addEventListener("click", function (event) {
    if (event.target === this) {
      modal.remove(modal);
      document.body.style.overflow = "visible";
    }
  });

  // Сортируем записи по дате (новые сверху)
  records.sort((a, b) => b.timestamp - a.timestamp);
  // Добавляем записи
  if (records.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "История операций пуста";
    content.appendChild(emptyMsg);

    if (isDarkMode) {
      emptyMsg.style.color = "white";
    } else {
      emptyMsg.style.color = "black";
    }
  } else {
    records.forEach((record) => {
      const separator = document.createElement("div");
      separator.id = "separator";
      separator.textContent = `${record.date}`;
      separator.style.padding = "6px";

      if(isDarkMode){
        separator.style.backgroundColor = "rgb(65, 65, 65)";
      } else {
        separator.style.backgroundColor = "rgb(212, 212, 212)";
      }
      separator.style.borderRadius = "4px";
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
      separator.style.fontFamily =
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      recordContent.style.fontFamily =
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      if (isDarkMode) {
        separator.style.color = "white";
        recordContent.style.color = "white";
        recordContent.style.backgroundColor = "rgb(90, 90, 90)";
      } else {
        separator.style.color = "black";
        recordContent.style.color = "black";
        recordContent.style.backgroundColor = "rgb(255, 255, 255)";
      }
    });
  }

  document.body.appendChild(modal);
  modal.appendChild(content);
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
    btn.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    btn.addEventListener("click", function () {
      if (isHistory == true) {
        document.body.style.overflow = "hidden";
      }
    });

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

document.querySelector(".moving-gif").addEventListener("click", function (e) {
  // Получаем позицию клика относительно контейнера
  const container = this.parentElement;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Создаём 30 частиц
  for (let i = 0; i < 30; i++) {
    createParticle(x, y, container);
  }

  // Можно добавить звук взрыва
  // new Audio('explosion.mp3').play();
});

function createParticle(x, y, container) {
  // Создаём элемент частицы
  const particle = document.createElement("div");
  particle.className = "particle";

  // Случайный цвет
  const hue = Math.random() * 60 + 10; // Оранжево-красные тона
  particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

  // Начальная позиция
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Случайное направление и расстояние
  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 100;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  // Устанавливаем CSS-переменные для анимации
  particle.style.setProperty("--tx", `${tx}px`);
  particle.style.setProperty("--ty", `${ty}px`);

  // Добавляем частицу в контейнер
  container.appendChild(particle);

  // Удаляем частицу после анимации
  setTimeout(() => {
    particle.remove();
  }, 1000);
}
