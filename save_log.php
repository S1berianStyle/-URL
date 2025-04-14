<?php
// Устанавливаем путь к файлу лога
$logFile = 'log.txt';

// Получаем данные из POST-запроса
$logData = isset($_POST['log']) ? urldecode($_POST['log']) : '';

if (!empty($logData)) {
    // Очищаем старые логи (старше 2 дней)
    if (file_exists($logFile)) {
        $fileContent = file_get_contents($logFile);
        $twoDaysAgo = strtotime('-2 days');
        
        // Разделяем логи по разделителям
        $entries = preg_split('/-{35}.*?-{35}/s', $fileContent, -1, PREG_SPLIT_NO_EMPTY);
        $timestamps = [];
        preg_match_all('/-{35}"(.*?)"-{35}/s', $fileContent, $timestamps);
        
        $newContent = '';
        foreach ($entries as $index => $entry) {
            if (!empty($timestamps[1][$index])) {
                $entryDate = DateTime::createFromFormat('d.m.y  H:i:s', $timestamps[1][$index]);
                if ($entryDate && $entryDate->getTimestamp() > $twoDaysAgo) {
                    $newContent .= "------------------------------------\"{$timestamps[1][$index]}\"------------------------------------" . $entry;
                }
            }
        }
        
        file_put_contents($logFile, $newContent);
    }
    
    // Добавляем новую запись
    file_put_contents($logFile, $logData, FILE_APPEND);
    echo 'Лог успешно сохранен';
} else {
    echo 'Ошибка: нет данных для сохранения';
}
?>