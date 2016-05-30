### General directory structure
All source files are located in [source](./source). Continue reading to see how the workflow is working. Once the project is built, you can find the generated site in `build`. In [_gulpfile](./_gulpfile) you will find parts of the [gulpfile.babel.js](./gulpfile.babel.js).


# HTML
The HTML is written in [Jade](http://jade-lang.com/) which is getting compiled to browser understandable HTML. The compiling is done with a [Gulp](http://gulpjs.com/) task. This task can also watch for changes so that the source files are getting recompiled when changed.

## Directory structure
The source files are directly placed under the [source](./source) directory like the [index.jade](./source/index.jade). You can also nest them in sub directories which will be reflected in the URL (**Note**: You can access the build HTML files without the suffix .html because of the [mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html) in the [.htaccess](./source/.htaccess#L40)). Because of Jade you can seperate your code in seperate files and include them. For these files I created the sub directory [_partials](./source/_partials). Files in this directory like the [base.jade](./source/_partials/base.jade) will not get compiled to HTML, they should only be included in other files like the [index.jade](./source/index.jade#L8).


# Stylesheets
The styles are written in [SCSS](http://sass-lang.com/) which is getting compiled to browser understandable CSS. The compiling is done with a [Gulp](http://gulpjs.com/) task. This task can also watch for changes so that the Stylesheets are getting recompiled when changed. The SCSS will also getting concatenated. You will get a `styles.css` which should contain all SCSS which will be used on every page. This file will get included on every page (look at [base.jade](./source/_partials/base.jade#L53)). You can also create seperate SCSS files like the [styles--index.scss](./source/assets/styles/styles--index.scss) which contains SCSS only used on this page. You can individually include them on the corresponding pages (look at [base.jade](./source/_partials/base.jade#L52)).

## Directory structure-
You will find the source files under [source/assets/styles](./source/assets/styles). The directory is seperated in three main directories. In [_atoms](./source/assets/styles/_atoms) you will place all basic styling of the HTML tags like `<table>` or `<ul>`. In [_base](./source/assets/styles/_base) you will place all variables, mixins, global classes and so on. In [_modules](./source/assets/styles/_modules) you will place your modules of your site like the header or a footer. The files are getting compiled to `build/assets/css`. Files and directories beginning with an underscore are only getting included in other files.

## Coding standards/style and linting
We included [SCSS-Lint](https://github.com/brigade/scss-lint) as linter for the styles source files. You will find the rules in [.scss-lint.yml](./.scss-lint.yml). You should configure your editor/IDE to lint your code on the fly (i.e Sublime Text 3: [Sublime​Linter-contrib-scss-lint](https://packagecontrol.io/packages/Sublime​Linter-contrib-scss-lint)). You can also lint the files with the Gulp task [lint:styles](./gulpfile.babel.js#L36). You can run it with `gulp lint:styles`.


# JavaScript
The JavaScript is written in [ES6/ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html) which is getting compiled to browser understandable [ES5](http://www.ecma-international.org/ecma-262/5.1/). The compiling is done with a [Gulp](http://gulpjs.com/) task. This task can also watch for changes so that the JavaScript is getting recompiled when changed. The JavaScript will also getting concatenated. You will get a `scripts.js` which should contain all JavaScript which will be used on every page. This file will get included on every page (look at [foot.hbs](./source/_partials/base.jade#L63)). You can also create seperate JavaScripts files like the [scripts--index.js](./source/assets/scripts/scripts--index.js) which contains JavScript only used on this page. You can individually include them on the corresponding pages (look at [base.jade](./source/_partials/base.jade#L62)).

## Directory structure-
You will find the source files under [source/assets/scripts](./source/assets/scripts).

## Coding standards/style and linting
We included [ESLint](http://eslint.org/) as linter for the JavaScript source files. You will find the rules in [.eslintrc](./.eslintrc). You should configure your editor/IDE to lint your code on the fly (i.e Sublime Text 3: [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)). You can also lint the files with the Gulp task [lint:scripts](./gulpfile.babel.js#L35). You can run it with `gulp lint:scripts`. This task will also fix some errors automatically.


# Images
_to be filled_
