Contribute
---
1. Install all dependencies with `(npm install && jspm install)`
1. Build/compile the project and open it automatically in your browser with `gulp watch`

Stylesheets
===
The styles are written in [SCSS](http://sass-lang.com/) which is getting compiled to browser understandable CSS. The compiling is done with a [Gulp](http://gulpjs.com/) task. This task can also watch for changes so that the SCSS is getting recompiled when the source files changed. The SCSS will also getting concatenated. You will get a `styles.css` which should contain all SCSS which will be used on every page. This file will get included on every page (look at [_head.hbs](./source/_partials/_head.hbs#L41)). You can also create seperate SCSS files like the [styles--index.scss](./source/assets/styles/styles--index.scss) which contains SCSS only used on this page. You can individually include them on the corresponding pages (look at [index.hbs](./source/index.hbs#L1) and [_head.hbs](./source/_partials/_head.hbs#L42)).

Directory structure
---
You will find the source files under [source/assets/styles](./source/assets/styles). The directory is seperated in three main directories. In [_atoms](./source/assets/styles/_atoms) you will place all basic styling of the HTML tags like `<table>` or `<ul>`. In [_base](./source/assets/styles/_base) you will place all variables, mixins, global classes and so on. In [_modules](./source/assets/styles/_modules) you will place your modules of your site like the header or a footer. The files are getting compiled to `build/assets/css`. Files and directories beginning with an `_` are only getting included in other files.

Coding standards/style and linting
---
We included [SCSS-Lint](https://github.com/brigade/scss-lint) as linter for the styles source files. You will find the rules in [.scss-lint.yml](./.scss-lint.yml). You should configure your editor/IDE to lint your code on the fly (i.e Sublime Text 3: [Sublime​Linter-contrib-scss-lint](https://packagecontrol.io/packages/Sublime​Linter-contrib-scss-lint)). You can also lint the files with the Gulp task `lint:styles`.

JavaScript
===
The JavaScript is written in ES6 which is getting compiled to browser understandable ES5. The compiling is done with a [Gulp](http://gulpjs.com/) task. This task can also watch for changes so that the JavaScript is getting recompiled when the source files changed. The JavaScript will also getting concatenated. You will get a `scripts.js` which should contain all JavaScript which will be used on every page. This file will get included on every page (look at [_foot.hbs](./source/_partials/_foot.hbs#L7)). You can also create seperate JavaScripts files like the [scripts--index.js](./source/assets/scripts/scripts--index.js) which contains JavScript only used on this page. You can individually include them on the corresponding pages (look at [index.hbs](./source/index.hbs#L9) and [_foot.hbs](./source/_partials/_foot.hbs#L8)).

Directory structure
---
You will find the source files under [source/assets/scripts](./source/assets/scripts).

Coding standards/style and linting
---
We included [ESLint](http://eslint.org/) as linter for the JavaScript source files. You will find the rules in [.eslintrc](./.eslintrc). You should configure your editor/IDE to lint your code on the fly (i.e Sublime Text 3: [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)). You can also lint the files with the Gulp task `lint:scripts`. This task will also fix some errors automatically.

Images
===

HTML
===

Directory structure
---
