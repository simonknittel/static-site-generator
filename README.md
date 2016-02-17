1. [Introduction](#static-site-generator)
    1. [Features](#features)
    1. [I want to use AngularJS, React, Ember or Meteor](#i-want-to-use-angularjs-react-ember-or-meteor)
    1. [Planned features](#planned-features)
1. [Start into an existing project](#start-into-an-existing-project)
1. [Set up a new project](#set-up-a-new-project)
    1. [Manual start](#manual-start)
        1. [Install dependencies](#install-dependencies)
        1. [Add AngularJS](#add-angularjs)

Static Site Generator
===
Start a new static or [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) page within seconds. The most important files and build tasks are already there and built with best practices. You only have to run the build task via [Gulp](http://gulpjs.com/) and you will get production ready code.

The goal of this generator is to have a base with everything already prepared to start very fast with a new project without being restricted by any limits like a closed source task runner. With that you are able to add new features or remove already implemented features like the [Jade template engine](http://jade-lang.com/) if you don't want to use them.

**Disclaimer:** This project is not made as a well maintained open source project, so that it can be used anytime and anywhere without issues. It's more for my own learning and experimentation with new technologies. Therefor I'm looking primarily for feedback.

Features
---
* Fast layout with precompiled [Jade templates](http://jade-lang.com/)
* Project structure based on the [atomic design concept](http://patternlab.io/about.html)
* [SCSS](http://sass-lang.com/) as CSS preprocessor
* [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) as naming syntax for CSS classes
* JavaScript package managament with [JSPM](http://jspm.io/)
    + Includes precompiling and ES6 translation via [Babel](https://babeljs.io/
* Extensive build workflow with Gulp 4
    + JavaScript linting, precompilation and minimization with [JSPM](http://jspm.io/)
    + Jade precompilation and HTML minimization
    + SCSS linting, precompilation and minimization
    + Image optimizing
        - optional [Kraken.io](https://kraken.io/) minimization (requires [PRO account](https://kraken.io/pro))
    + SFTP-Upload
    + Possibility to compile seperate bundled scripts and styles files for seperate pages
    + Bundling SVG icons to a single SVG stack

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

### Install dependencies
1. Set the live URL in [config.js](./_gulpfile/config.js#L25) for automated sitemap generation
2. Set the live URL in [robots.txt](./source/robots.txt#L1)
3. Run `npm install`
4. Run `npm start`

### Enable Travis CI
1. Enable your repository in Travis CI
2. Enable `Build only if .travis.yml is present`
3. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` and set it to base64(`username:password`)
4. Add a badge to your README.md with:
```markdown
[![Build Status](https://travis-ci.org/USERNAME/REPOSITORY?branch=master)](https://travis-ci.org/USERNAME/REPOSITORY)
```

### Enable Codeship
1. Add the following to `Setup Commands`:

```shell
nvm install 5.0

npm install -g jspm
jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN

npm install
```

2. Add the following to `Configure Test Pipelines`:

```shell
npm test
```

3. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` and set it to base64(`username:password`)

4. Add a badge to your README.md with:
```markdown
[![Build Status](https://codeship.com/projects/UUID/status?branch=master)](https://codeship.com/projects/ID)
```

5. Add Continuous Deployment with https://codeship.com/documentation/continuous-deployment/deployment-with-ftp-sftp-scp/#continuous-deployment-with-ftp

### Enable Sentry/Raven.js
1. Create a new project on Sentry and add your public DSN to [scripts.js](./source/assets/scripts/scripts.js#L5)
1. Uncomment Raven.js on [base.jade](./source/_partials/base.jade#L57)

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
