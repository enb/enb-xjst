enb-xjst [![NPM version](https://badge.fury.io/js/enb-xjst.svg)](http://badge.fury.io/js/enb-xjst) [![Build Status](https://travis-ci.org/enb-make/enb-xjst.svg?branch=master)](https://travis-ci.org/enb-make/enb-xjst) [![Dependency Status](https://gemnasium.com/enb-make/enb-xjst.svg)](https://gemnasium.com/enb-make/enb-xjst)
========

Поддержка технологий на&nbsp;основе [`xjst`](https://github.com/bem/xjst).
Базовые шаблоны для `bemhtml` находятся в&nbsp;[`bem-bl@v1`](https://github.com/bem/bem-bl/tree/support/1.x).

**Внимание**: для технологий, базовые шаблоны которых находятся в&nbsp;библиотеке [`bem-core`](https://github.com/bem/bem-core) следует использовать [`enb-bemxjst`](https://github.com/enb-make/enb-bemxjst) пакет.

Установка:
----------

```
npm install --save-dev enb-xjst
```
Для работы модуля требуется зависимость от пакета enb версии 0.12.0 или выше.

Технологии
----------
* [bemhtml](#bemhtml)
* [bemtree](#bemtree)
* [html-from-bemjson](#html-from-bemjson)
* [html-from-bemjson-i18n](#html-from-bemjson-i18n)

bemhtml
=======

Склеивает `bemhtml`-файлы по deps'ам, обрабатывает `xjst`-транслятором, сохраняет (по умолчанию) в виде `?.bemhtml.js`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `bemhtml`.
* *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
* *String* **applyFuncName** — Имя apply-функции базового шаблона BEMHTML. По умолчанию — `'apply'`.
* *Boolean* **devMode** — Development-режим.  По умолчанию `true`.
* *Boolean* **cache** — Кеширование. По умолчанию — `false`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/bemhtml'));
```

bemtree
=======

Склеивает `bemtree.xjst`-файлы по deps'ам, обрабатывает `xjst`-транслятором, сохраняет (по умолчанию) в виде `?.bemtree.xjst.js`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bemtree.xjst.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `bemtree.xjst`.
* *String* **exportName** — Имя переменной-обработчика BEMTREE. По умолчанию — `'BEMTREE'`.
* *String* **applyFuncName** — Имя apply-функции базового шаблона BEMTREE. По умолчанию — `'apply'`.
* *Boolean* **devMode** — Development-режим. По умолчанию `true`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/bemtree'));
```

html-from-bemjson
=================

Собирает *html*-файл с помощью *bemjson* и *bemhtml*.

**Опции**

* *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
* *String* **bemjsonTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
* *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.html`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bemxjst/techs/html-from-bemjson'));
```

html-from-bemjson-i18n
======================

Собирает *html*-файл с помощью *bemjson*, *bemhtml*, *lang.all* и *lang.{lang}*.

**Опции**

* *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
* *String* **bemjsonTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
* *String* **langAllTarget** — Исходный langAll-файл. По умолчанию — `?.lang.all.js`.
* *String* **langTarget** — Исходный lang-файл. По умолчанию — `?.lang.{lang}.js`. Если параметр lang не указан, берется первый из объявленных в проекте языков
* *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.{lang}.html`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/html-from-bemjson-i18n'));
```

История изменений
-----------------

История изменений на [отдельной странице](/CHANGELOG.md).

Разработка
----------
Руководство на [отдельной странице](/CONTRIBUTION.md).

Запуск тестов
-------------
```
$ npm test
```
