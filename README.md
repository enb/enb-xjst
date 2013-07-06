enb-bemhtml
===========

Поддерка BEMHTML для ENB. Пакет содержит технологию `enb-bemhtml/techs/bemhtml` для сборки BEMHTML.

Установка:

```
npm install enb-bemhtml
```

bemhtml
-------

Склеивает *bemhtml*-файлы по deps'ам, обрабатывает BEMHTML-транслятором, сохраняет (по умолчанию) в виде `?.bemhtml.js`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
* *Boolean* **devMode** — Development-режим. По умолчанию — `true`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bemhtml/techs/bemhtml'));
```
