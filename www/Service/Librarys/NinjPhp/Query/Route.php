<?php
   namespace Query;

   /**
    * Функция, позволяющая навесить обработчики на основной запрос
    * Не устанавливая их в параметрах конструтора запроса
    * Или при ручной вставке
    *
    * @config {Array} Route
    * @config {String} Route.route Регулярное выражение
    * @config {String} Route.method Метод запроса (POST|GET|PUT|DELETE|PUTCH)
    *    ! Если метод не указан, то обработчик будет применен к любому методу
    * @config {String} Route.type Тип обработчика,
    *    чтобы можно разграничить обработчики под разные нужды
    *    например обратка корректных запросов, обработка ошибок и т.д.
    *    По-умолчанию в классе Query используется 3 типа:
    *       1. success; 2. error; 3. service
    *    ! Если тип не указан, то обработчик будет применен к любому типу
    * @config {Function} Route.handler Обработчик
    * @config {Array} Route.arguments Агрументы,
    *    которые будут переданы именно в этот метод
    * @config {Number} Route.priority Приоритет выполенения
    *
    * ! Чтобы преравать выполнение последующих в обработчике нужно выполнить "exit;"
    */
   function route($route) {
      // Создадим глобальный массив роутов
      if (!isset($GLOBALS["routes"])) {
         $GLOBALS["routes"] = [];
      }

      $GLOBALS["routes"][] = (array) $route;
   }
?>