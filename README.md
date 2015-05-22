enb-xjst
========

[![NPM version](https://img.shields.io/npm/v/enb-xjst.svg?style=flat)](https://www.npmjs.org/package/enb-xjst) [![Build Status](https://img.shields.io/travis/enb-bem/enb-xjst/master.svg?style=flat&label=tests)](https://travis-ci.org/enb-bem/enb-xjst) [![Build status](https://img.shields.io/appveyor/ci/blond/enb-xjst.svg?style=flat&label=windows)](https://ci.appveyor.com/project/blond/enb-xjst) [![Coverage Status](https://img.shields.io/coveralls/enb-bem/enb-xjst.svg?style=flat)](https://coveralls.io/r/enb-bem/enb-xjst?branch=master) [![Dependency Status](https://img.shields.io/david/enb-bem/enb-xjst.svg?style=flat)](https://david-dm.org/enb-bem/enb-xjst)

Поддержка технологий на&nbsp;основе [XJST](https://bem.info/tools/templating-engines/xjst/).
Базовые шаблоны для BEMHTML находятся в&nbsp;[bem-bl](https://ru.bem.info/libs/bem-bl/current/).

Используется XJST-транслятор из пакета [bem-bl-xjst](https://github.com/bem/bem-bl-xjst). Для базовых шаблонов из `bem-bl@1.x` следует использовать `bem-bl-xjst@1.x`, для `bem-bl@2.x` — `bem-bl-xjst@2.x`.

**Внимание**: для технологий, базовые шаблоны которых находятся в&nbsp;библиотеке [bem-core](https://ru.bem.info/libs/bem-core/current/), следует использовать [enb-bemxjst](https://github.com/enb-bem/enb-bemxjst) пакет.

Установка
----------

```
npm install --save-dev enb-xjst
```

Для работы модуля требуется зависимость от пакета `enb` версии `0.13.0` или выше, а так же `bem-bl-xjst` версии `1.3.2` или выше.

Технологии
----------
* [bemhtml](#bemhtml)
* [bemtree](#bemtree)
* [html-from-bemjson](#html-from-bemjson)

### bemhtml

Склеивает BEMHTML-файлы по deps'ам, обрабатывает XJST-транслятором, сохраняет (по умолчанию) в виде `?.bemhtml.js`.

**Опции**

* *String* **target** — результирующий таргет. По умолчанию — `?.bemhtml.js`.
* *String* **filesTarget** — `files`-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — BEMHTML.
* *String* **exportName** — имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
* *String* **applyFuncName** — имя `apply`-функции базового шаблона BEMHTML. По умолчанию — `'apply'`.
* *Boolean* **devMode** — development-режим.  По умолчанию `true`.
* *Boolean* **cache** — кеширование. По умолчанию — `false`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/bemhtml'));
```

### bemtree

Склеивает `bemtree.xjst`-файлы по deps'ам, обрабатывает XJST-транслятором, сохраняет (по умолчанию) в виде `?.bemtree.xjst.js`.

**Опции**

* *String* **target** — результирующий таргет. По умолчанию — `?.bemtree.xjst.js`.
* *String* **filesTarget** — `files`-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `bemtree.xjst`.
* *String* **exportName** — имя переменной-обработчика BEMTREE. По умолчанию — `'BEMTREE'`.
* *String* **applyFuncName** — имя `apply`-функции базового шаблона BEMTREE. По умолчанию — `'apply'`.
* *Boolean* **devMode** — development-режим. По умолчанию `true`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/bemtree'));
```

### html-from-bemjson

Собирает HTML-файл с помощью BEMJSON и BEMHTML.

**Опции**

* *String* **bemhtmlFile** — исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
* *String* **bemjsonFile** — исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
* *String* **target** — результирующий HTML-файл. По умолчанию — `?.html`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-xjst/techs/html-from-bemjson'));
```

Лицензия
--------

© 2013 YANDEX LLC. Код лицензирован [Mozilla Public License 2.0](LICENSE.txt).
