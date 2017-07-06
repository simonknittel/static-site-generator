**It's recommend to read the whole documentation!**

1. [Introduction](#static-site-generator)
  1. [Features](#features)
  2. [I want to use AngularJS, React, Ember or Meteor](#i-want-to-use-angularjs-react-ember-or-meteor)
  3. [Planned features and issues](#planned-features-and-issues)
  4. [Full documentation](#full-documentation)


# Static Site Generator
[![Travis branch](https://img.shields.io/travis/simonknittel/static-site-generator/master.svg)](https://travis-ci.org/simonknittel/static-site-generator)
[![Codeship](https://img.shields.io/codeship/b608b370-b5e9-0133-659d-724fe1788ad4/master.svg)](https://app.codeship.com/projects/134192)
[![CircleCI](https://img.shields.io/circleci/project/simonknittel/static-site-generator/master.svg)](https://circleci.com/gh/simonknittel/static-site-generator/tree/master)
[![AppVeyor](https://img.shields.io/appveyor/ci/simonknittel/static-site-generator/master.svg)](https://ci.appveyor.com/project/simonknittel/static-site-generator)
[![David](https://img.shields.io/david/simonknittel/static-site-generator.svg?maxAge=2592000)]()
[![David](https://img.shields.io/david/dev/simonknittel/static-site-generator.svg?maxAge=2592000)]()
[![Gitter](https://img.shields.io/gitter/room/simonknittel/static-site-generator.svg)](https://gitter.im/simonknittel/static-site-generator)

Start a new static or [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) site within seconds. The most important files and build tasks are already there and built with best practices. You only have to run the build task via [Gulp](http://gulpjs.com) and you will get a production ready site.

The goal of this generator is to have a base with everything already prepared to start very fast with a new project without being restricted by any limits like a closed source task runner. With that you are able to add new features or remove already implemented features like the [Pug (formerly Jade) template engine](https://pugjs.org) if you don't want to use them.

**Disclaimer:** This project is not intended a well maintained open source project, so that it can be used anytime and anywhere without issues. It's more for my own learning and experimentation with new technologies. Therefore I'm looking primarily for feedback.


## Features
* Fast layouting with precompiling [Pug (formerly Jade) templates](https://github.com/pugjs/pug) with Gulp
* Project structure based on the [atomic design concept](http://patternlab.io) (you don't have to follow this pattern)
* [SCSS](http://sass-lang.com) as CSS preprocessor
* [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax) as default naming syntax for CSS classes (of course you can choose your own)
* JavaScript package managament with [JSPM](http://jspm.io)
  + Includes precompiling and ES6 translation via [Babel](https://babeljs.io)
* Extensive build workflow with Gulp 4
  + JavaScript precompilation and minimization with [JSPM](http://jspm.io)
  + JavaScript linting with [ESLint](http://eslint.org)
  + Pug precompilation and HTML minimization
  + Injection of data into the Pug templates
  + SCSS linting, precompilation and minimization
  + Image optimizing
    - (Optional) [Kraken.io](https://kraken.io) minimization (requires [PRO account](https://kraken.io/pro))
  + Bundling SVG icons to a single SVG stack
* Targeted Node.js compability
  + Last three minor/patch versions
  + Last three LTS versions


<!--
## I want to use [AngularJS](https://angularjs.org), [React](https://facebook.github.io/react), [Ember](http://emberjs.com) or [Meteor](https://www.meteor.com)

You can easily add AngularJS to this generator. Read [here](#add-angularjs) to see how to add AngularJS to this generator. Ember is highly recommend to be used with [Ember CLI](http://www.ember-cli.com). The generator is currently not tested and optimized for the use with Meteor or React.
-->


## Planned features and issues
Checkout the [issues page](https://github.com/simonknittel/static-site-generator/labels/enhancement)


## Full documentation
If you are interesed how some things works or what is possible read the full [documentation](./INDEX.md)


## License

Copyright 2017 Simon Knittel <hallo@simonknittel.de> (https://simonknittel.de)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
