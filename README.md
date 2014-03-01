enb-bemhtml [![NPM version](https://badge.fury.io/js/enb-bemhtml.png)](http://badge.fury.io/js/enb-bemhtml) [![Build Status](https://travis-ci.org/enb-make/enb-bemhtml.png?branch=master)](https://travis-ci.org/enb-make/enb-bemhtml) [![Dependency Status](https://gemnasium.com/enb-make/enb-bemhtml.png)](https://gemnasium.com/enb-make/enb-bemhtml)
===========

Поддержка BEMHTML для ENB. Пакет содержит `enb-bemhtml/techs/bemhtml` и `enb-bemhtml/techs/bemtree` технологии.

**Внимание**: для нового js-совместимого синтаксиса следует использовать [`enb-bemxjst`](https://github.com/enb-make/enb-bemxjst.git).

Установка:
----------

```
npm install enb-bemhtml
```

bemhtml
-------

Склеивает `bemhtml`-файлы по deps'ам, обрабатывает BEMHTML-транслятором, сохраняет (по умолчанию) в виде `?.bemhtml.js`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
* *String* **applyFuncName** — Имя apply-функции базового шаблона BEMHTML. По умолчанию — `'apply'`.
* *Boolean* **devMode** — Development-режим. По умолчанию зависит от YENV (true, если YENV=development).
* *Boolean* **cache** — Кеширование. По умолчанию — `false`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bemhtml/techs/bemhtml'));
```

bemtree
-------

Склеивает `bemtree.xjst`-файлы по deps'ам, обрабатывает BEMHTML-транслятором, сохраняет (по умолчанию) в виде `?.bemtree.xjst.js`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bemtree.xjst.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **exportName** — Имя переменной-обработчика BEMTREE. По умолчанию — `'BEMTREE'`.
* *String* **applyFuncName** — Имя apply-функции базового шаблона BEMTREE. По умолчанию — `'apply'`.
* *Boolean* **devMode** — Development-режим. По умолчанию зависит от YENV (true, если YENV=development).

**Пример**

```javascript
nodeConfig.addTech(require('enb-bemhtml/techs/bemtree'));
```
