**It's recommended to read the whole documentation!**

1. [Introduction](#-static-site-generator)
    1. [Features](#-features)
    2. [Planned features and issues](#-planned-features-and-issues)
    3. [Full documentation](#-getting-started-and-full-documentation)
    4. [License](#-license)


# ⚙️ Static Site Generator

[![Donate on patreon](https://badgen.net/badge/donate%20on/patreon/orange)](https://patreon.com/simonknittel)
[![Travis branch](https://img.shields.io/travis/simonknittel/static-site-generator/master.svg)](https://travis-ci.com/simonknittel/static-site-generator)
[![Codeship](https://img.shields.io/codeship/b608b370-b5e9-0133-659d-724fe1788ad4/master.svg)](https://app.codeship.com/projects/134192)
[![CircleCI](https://img.shields.io/circleci/project/simonknittel/static-site-generator/master.svg)](https://circleci.com/gh/simonknittel/static-site-generator/tree/master)
[![AppVeyor](https://img.shields.io/appveyor/ci/simonknittel/static-site-generator/master.svg)](https://ci.appveyor.com/project/simonknittel/static-site-generator)
[![David](https://img.shields.io/david/simonknittel/static-site-generator.svg?maxAge=2592000)](https://david-dm.org/simonknittel/static-site-generator)
[![David](https://img.shields.io/david/dev/simonknittel/static-site-generator.svg?maxAge=2592000)](https://david-dm.org/simonknittel/static-site-generator?type=dev)
[![Gitter](https://img.shields.io/gitter/room/simonknittel/static-site-generator.svg)](https://gitter.im/simonknittel/static-site-generator)

Static site generator / project skeleton for creating production-ready sites. All necessary files and build tasks are already in place and fitted with good practices. You only need to install the dependencies and your are ready to go, perfect for [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) sites.

The goal of this generator is to have a project skeleton with everything already prepared to quickly start with a new project without being restricted by any limits like a template system of a specific CMS. You can easily add, remove or replace features like the [Pug template engine](https://pugjs.org) if you don't want to use them.

**Disclaimer:** This project is not intended as a well maintained and stable open source project. It's for my own learning and experimentation with new technologies. Therefore I can't ensure that it can be used anytime and anywhere without issues. Still I'm looking for your feedback and opinions.


## ✨ Features

* Fast layouting with pre-compiling Pug templates
* Project structure based on the [atomic design concept](http://atomicdesign.bradfrost.com) (you can easily change it if you don't want to use it)
* [SASS](http://sass-lang.com) as CSS preprocessor
* [BEM](http://getbem.com) as default naming syntax for CSS classes (you don't have to follow this)
* Automated build pipeline with [Gulp 4](http://gulpjs.com)
  + JavaScript transpilation and bundling with [Babel](https://babeljs.io) and [webpack](https://webpack.js.org)
  + JavaScript linting with [ESLint](http://eslint.org)
  + Pug precompilation and HTML minimization
  + Injection of data with CSON into the Pug templates
  + SASS linting, pre-compilation and minimization
  + Image optimizing
  + Bundling of SVG icons into a SVG stack
* Node.js&reg; compability
  + Latest release from the [_Current_ branch](https://github.com/nodejs/Release#release-schedule1)
  + Latest release from the [_LTS_ branch](https://github.com/nodejs/Release#release-schedule1)


## 🚧 Planned features and issues

Checkout the [issues page](https://github.com/simonknittel/static-site-generator/issues)


## 📚 Getting started and full documentation

If you are interesed how some things works or what is possible read the [full documentation](./docs/INDEX.md)


## 🎁 Support

_"Donations are not required but always appreciated."_

Like this quote implies, I won't stop make things open source, if there are no donations. But they would always be appreciated by me ❤

[![Become a patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://patreon.com/simonknittel)


## ©️ License

Copyright 2020 Simon Knittel (<https://simonknittel.de>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
