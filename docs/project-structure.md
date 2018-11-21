1. [Project structure](#project-structure)
    1. [General directory structure](#general-directory-structure)
    2. [HTML](#html)
        1. [Directory structure](#directory-structure)
    3. [Stylesheets](#stylesheets)
        1. [Directory structure](#directory-structure-1)
        2. [Coding standards/style and linting](#coding-standardsstyle-and-linting)
    4. [JavaScript](#javascript)
        1. [Directory structure](#directory-structure-2)
        2. [Coding standards/style and linting](#coding-standardsstyle-and-linting-1)
    5. [Images](#images)
    6. [Linting](#linting)


# Project structure


## General directory structure
All source files are located in [src](./src). Continue reading to see how the workflow is working. Once the project is built, you can find the generated site in `dist`. In [_gulpfile](./_gulpfile) you will find parts of the [gulpfile.babel.js](./gulpfile.babel.js).


## HTML
The HTML is written in [Pug (formerly Jade)](https://pugjs.org) which is getting compiled to browser understandable HTML. It can be filled with data provied via JSON files in [_data](./src/_data). The compiling is done with a [Gulp](http://gulpjs.com) task. This task can also watch for changes so that the source files are getting recompiled when changed.

### Directory structure
The source files are directly placed under the [src](./src) directory like the [index.pug](./src/index.pug). You can also nest them in sub directories which will be reflected in the URL (**Note**: You can access the built HTML files without the suffix .html because of the [mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html) in the [.htaccess](./src/.htaccess#L27)). Because of Pug you can seperate your code in seperate files and include them. For these files I created the sub directory [_templates](./src/_templates). Files in this directory like the [base.pug](./src/_templates/base.pug) will not get compiled to HTML, they should only be included in other files like the [index.pug](./src/index.pug#L1).


## Stylesheets
The styles are written in [SCSS](http://sass-lang.com) which is getting compiled to browser understandable CSS. The compiling is done with a [Gulp](http://gulpjs.com) task. This task can also watch for changes so that the Stylesheets are getting recompiled when changed. The SCSS will also getting concatenated. You will get a `styles.css` which should contain all SCSS which will be used on every page. This file will get included on every page (look at [base.pug](./src/_templates/base.pug#L53)). You can also create seperate SCSS files like the [front.bundle.scss](./src/assets/styles/front.bundle.scss) which contains SCSS only used on this page. You can individually include them on the corresponding pages (look at [front-page.pug](./src/_templates/pages/front.pug#L9)).

### Directory structure
You will find the source files under [src/assets/styles](./src/assets/styles). The directory is seperated in three main directories. In [_atoms](./src/assets/styles/_atoms) you will place all basic styling of the HTML tags like `<table>` or `<ul>`. In [_base](./src/assets/styles/_base) you will place all variables, mixins, global classes and so on. In [_modules](./src/assets/styles/_modules) you will place your modules of your site like the header or a footer. The files are getting compiled to `dist/assets/css`. Files and directories beginning with an underscore are only getting included in other files.

### Coding standards/style and linting
I included [stylelint](https://stylelint.io/) as linter for the styles source files. You will find the rules in [.stylelintrc](./.stylelintrc). You should configure your editor/IDE to lint your code on the fly.


## JavaScript
The JavaScript is written in [ES6/ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html) which is getting compiled to browser understandable [ES5](http://www.ecma-international.org/ecma-262/5.1). The compiling is done with a [Gulp](http://gulpjs.com) task. This task can also watch for changes so that the JavaScript is getting recompiled when changed. The JavaScript will also getting concatenated. You will get a `global.bundle.js` which should contain all JavaScript which will be used on every page. This file will get included on every page (look at [base.pug](./src/_templates/base.pug#L61)). You can also create seperate JavaScripts files like the [front.bundle.js](./src/assets/scripts/front.bundle.js) which contains JavScript only used on this page. You can individually include them on the corresponding pages (look at [front-page.pug](./src/_templates/pages/front.pug#L11)).

### Directory structure
You will find the source files under [src/assets/scripts](./src/assets/scripts).

### Coding standards/style and linting
I included [ESLint](http://eslint.org) as linter for the JavaScript source files. You will find the rules in [.eslintrc](./.eslintrc). You should configure your editor/IDE to lint your code on the fly.


## Images
_wip_


## Linting
The linters don't run when using `npm start` or `npm run default`. It will run when using `npm test`. We recommend that you use feature branches and a CI which runs this tasks when you push to it. This decision was made to improve the duration of the watch tasks. You should configure your editor/IDE to lint your code on the fly (there are plugins for every popular editor/IDE).
