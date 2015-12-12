1. [Introduction](#static-site-template)
    1. [Features](#features)
    1. [I want to use AngularJS, React, Ember or Meteor](#i-want-to-use-angularjs-react-ember-or-meteor)
    1. [Planned features](#planned-features)
1. [How to set up a new project](#how-to-set-up-a-new-project)
    1. [Quick start (recommend)](#quick-start-recommend)
    1. [Manual start](#manual-start)
        1. [Install dependencies](#install-dependencies)
        1. [Add AngularJS](#add-angularjs)
1. [Want to contribute?](#want-to-contribute)

Static Site Template
===
This template is great to start a new static or [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) page within a few seconds. The most important files and build tasks are already there and filled with best practices. You only have to run the build task via [Gulp](http://gulpjs.com/) and you will get production ready code.

The goal of this template is to have a template with everything already prepared to start very fast with a new project without being restricted by any limits. With that you are able to add new features or remove already implemented features like the [Application Cache](http://www.html5rocks.com/en/tutorials/appcache/beginner/) if you don't want to use them.

Features
---
* Fast layout with precompiled [Handlebars templates](http://handlebarsjs.com/)
* Project structure based on the [atomic design concept](http://patternlab.io/about.html)
* [SCSS](http://sass-lang.com/) as CSS preprocessor
* [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) as naming syntax for CSS classes
* JavaScript package managament with [JSPM](http://jspm.io/)
    + Includes precompiling and ES6 translation via [Babel](https://babeljs.io/)
* Extensive build workflow with Gulp
    + JavaScript precompilation and minimization with [JSPM](http://jspm.io/)
    + Handlebars precompilation and HTML minimization
    + SCSS precompilation and minimization
    + Image optimizing
        - optional [Kraken.io](https://kraken.io/) minimization (requires [PRO account](https://kraken.io/pro))
    + SFTP-Upload
    + Compiling of seperate bundled scripts and styles files for seperate pages
* Application Cache already integrated
* Built with the current best practices and newest standards

I want to use [AngularJS](https://angularjs.org/), [React](https://facebook.github.io/react/), [Ember](http://emberjs.com/) or [Meteor](https://www.meteor.com/)
---
You can easily add AngularJS to this template. Read [here](#add-angularjs) to see how to add AngularJS to this template. Ember is highly recommend to be used with [Ember CLI](http://www.ember-cli.com/). The template is currently not tested and optimized for the use with Meteor or React.

Planned features
---
* [Web workers](http://www.html5rocks.com/en/tutorials/workers/basics/)
* Extended SVG handling with Gulp
* Upload of the compiled CSS and JavaScript files to the CDN of Amazon or Microsoft with Gulp
* Sitemap generation with Gulp
* Let the developer through the init.js decide whether he wants the application cache added or not

---

How to set up a new project
===

Quick start (recommend)
---
The initialization script asks you for the project name and a short description of your project. Then it will ask you if you want to add AngularJS to your project. After that it will install all dependencies and your project is ready to go.

1. Run `node init.js`
2. Follow the instructions
3. Run `gulp watch`

Manual start
---

### Install dependencies
1. Run `npm install`
1. Run `jspm install`
1. Run `gulp watch`

### Add AngularJS
look at https://bitbucket.org/simonknittel/scrum


1. Run `jspm install angular`
1. Copy the `./init/_angular-app` directory to `./source/assets/scripts`
1. Add the following to the `<html>` tag in the `./source/_partials/_head.hbs`

        ng-app="app"

1. Add the following to the `./source/assets/scripts/main.js`

        import * as app from './_angular-app/app.module';

1. Add the following to the `./source/index.hbs`

        <ng-include src="'assets/js/_angular-app/modules/app/index/index.html'"></ng-include>

1. Add the following to the `gulpfile.js`

        var source_angular_app = source_scripts + '/_angular-app';
        var build_angular_app = build_scripts + '/_angular-app';

        gulp.task('copy:angular-app', function() {
            return gulp.src(source_angular_app + '/**/*.html')
                .pipe(changed(build_angular_app))
                .pipe(gulp.dest(build_angular_app));
        });

1. Add the new gulp task to the copy and watch tasks

1. Add ui router

Want to contribute?
===

Checkout [CONTRIBUTE.md](./CONTRIBUTE.md)
