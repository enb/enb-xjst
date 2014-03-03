enb-xjst [![NPM version](https://badge.fury.io/js/enb-xjst.png)](http://badge.fury.io/js/enb-xjst) [![Build Status](https://travis-ci.org/enb-make/enb-xjst.png?branch=master)](https://travis-ci.org/enb-make/enb-xjst) [![Dependency Status](https://gemnasium.com/enb-make/enb-xjst.png)](https://gemnasium.com/enb-make/enb-xjst)
========

Поддержка технологий, базирующихся на&nbsp;основе [`xjst`](https://github.com/bem/xjst), для ENB.
Базовые шаблоны для `bemhtml`-технологии находятся в&nbsp;библиотеке [`bem-bl@v1`](https://github.com/bem/bem-bl/tree/support/1.x).

**Внимание**: для технологий, базовые шаблоны которых находятся в&nbsp;библиотеке [`bem-core`](https://github.com/bem/bem-core) следует использовать [`enb-bemxjst`](https://github.com/enb-make/enb-bemxjst) пакет.

Установка:
----------

```
npm install --save-dev enb-xjst
```
Для работы модуля требуется зависимость от пакета enb версии 0.8.22 или выше.

Технологии
----------
* [bemhtml](#bemhtml)
* [bemtree](#bemtree)

bemhtml
=======

Склеивает `bemhtml`-файлы по deps'ам, обрабатывает `xjst`-транслятором, сохраняет (по умолчанию) в виде `?.bemhtml.js`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
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
* *String* **exportName** — Имя переменной-обработчика BEMTREE. По умолчанию — `'BEMTREE'`.
* *String* **applyFuncName** — Имя apply-функции базового шаблона BEMTREE. По умолчанию — `'apply'`.
* *Boolean* **devMode** — Development-режим. По умолчанию `true`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/bemtree'));
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