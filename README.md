1. [Introduction](#static-site-generator)
    1. [Features](#features)
    1. [I want to use AngularJS, React, Ember or Meteor](#i-want-to-use-angularjs-react-ember-or-meteor)
    1. [Planned features](#planned-features)
1. [Start into an existing project](#start-into-an-existing-project)
1. [Set up a new project](#set-up-a-new-project)
    1. [Quick start (still in development)](#quick-start-still-in-development)
    1. [Manual start (recommend)](#manual-start-recommend)
        1. [Install dependencies](#install-dependencies)
        1. [Add AngularJS](#add-angularjs)

Static Site Generator
===
Start a new static or [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) page within seconds. The most important files and build tasks are already there and filled with best practices. You only have to run the build task via [Gulp](http://gulpjs.com/) and you will get production ready code.

The goal of this generator is to have a generator with everything already prepared to start very fast with a new project without being restricted by any limits. With that you are able to add new features or remove already implemented features like the [Jade template engine](http://jade-lang.com/) if you don't want to use them.

Features
---
* Fast layout with precompiled [Jade templates](http://jade-lang.com/)
* Project structure based on the [atomic design concept](http://patternlab.io/about.html)
* [SCSS](http://sass-lang.com/) as CSS preprocessor
* [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) as naming syntax for CSS classes
* JavaScript package managament with [JSPM](http://jspm.io/)
    + Includes precompiling and ES6 translation via [Babel](https://babeljs.io/)
* Extensive build workflow with Gulp
    + JavaScript linting, precompilation and minimization with [JSPM](http://jspm.io/)
    + Jade precompilation and HTML minimization
    + SCSS linting, precompilation and minimization
    + Image optimizing
        - optional [Kraken.io](https://kraken.io/) minimization (requires [PRO account](https://kraken.io/pro))
    + SFTP-Upload
    + Compiling of seperate bundled scripts and styles files for seperate pages
    + Bundling SVG icons to a single SVG stack
* Built with the current best practices and newest standards

I want to use [AngularJS](https://angularjs.org/), [React](https://facebook.github.io/react/), [Ember](http://emberjs.com/) or [Meteor](https://www.meteor.com/)
---
You can easily add AngularJS to this generator. Read [here](#add-angularjs) to see how to add AngularJS to this generator. Ember is highly recommend to be used with [Ember CLI](http://www.ember-cli.com/). The generator is currently not tested and optimized for the use with Meteor or React.

Planned features
---
Checkout the [issues page](https://github.com/simonknittel/static-site-generator/labels/enhancement)

---

Start into an existing project
===

Checkout [CONTRIBUTE.md](./CONTRIBUTE.md)

Set up a new project
===

Quick start (still in development)
---
The initialization script asks you for the project name and a short description of your project. Then it will ask you if you want to add AngularJS to your project. After that it will install all dependencies and your project is ready to go.

1. Run `node init.js`
2. Follow the instructions
3. Run `gulp watch`

Manual start (recommend)
---

### Install dependencies
1. Run `npm install`
1. Run `jspm install`
1. Run `gulp watch`

### Add AngularJS

1. Run `jspm install angular angular-ui-router`
1. Copy the [init/_angular-app](./init/_angular-app) directory to [source/assets/scripts](./source/assets/scripts)
1. Add the following to the `<html>` tag in the [head.hbs](./source/_partials/head.hbs#L4)

```html
ng-app="app"
```

1. Add the following to the [<head>](./source/_partials/head.hbs#L15) in the [head.hbs](./source/_partials/head.hbs)

```html
<base href="/">
```

1. Add the following to the [scripts.js](./source/assets/scripts/scripts.js)

```javascript
import './_angular-app/app.module';
```

1. Add the following to the [index.hbs](./source/index.hbs#L5)

```html
<ui-view></ui-view>
```

1. Add the following to the [gulpfile.babel.js](./gulpfile.babel.js)

```javascript
config.paths.source.angularApp = config.paths.source.scripts + '/_angular-app';

...

config.paths.build.angularApp = config.paths.build.scripts + '/_angular-app';

...

gulp.task('copy:angular-app', copy.angularApp);
gulp.task('copy', gulp.parallel('copy:base'/**, 'copy:cache-manifest'*/, 'copy:libraries', 'copy:angular-app'));

...

gulp.watch(config.paths.source.angularApp + '/**/*.html', gulp.series('copy:angular-app', browserSync.reload));

...

export function angularApp() {
    return gulp.src(config.paths.source.angularApp + '/**/*.html')
        .pipe(cached('copy:angular-app'))
        .pipe(gulp.dest(config.paths.build.angularApp));
}
```
