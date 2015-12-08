Contribute
---
1. Clone this repository
1. Install all NPM dependencies with: `npm install`
1. Install all JSPM dependencies with: `jspm install`
1. Build/compile the page and open it in your browser with `gulp watch`

Stylesheets
===

Workflow
---
The styles are written in SCSS which is getting compiled to browser understandable CSS. The compiling is done with a Gulp task. This task can also watch for changes so that the SCSS is getting recompiled when the source files changed. The SCSS will also getting concatenated. You will get a `styles.css` which should contain all SCSS which will be used on the whole site. This file will get included on every page (look at [_head.hbs](./source/_partials/_head.hbs#L41)). You can also create seperate SCSS files like the `styles--index.scss` which contains modules only used on this page. You can individually include them on the corresponding pages (look at [index.hbs](./source/index.hbs#L1) and [_head.hbs](./source/_partials/_head.hbs#L42)).

Directory structure
---
You will find the source files under `source/assets/styles`. The directory is seperated in three main directories. In `_atoms` you will place all basic styling of the HTML tags like `<table>` or `<ul>`. In `_base` you will place all variables, mixins, global classes and so on. In `_modules` you will place your modules of your site like the header or a footer. The files are getting compiled to `build/assets/css`. Files and directories beginning with an `_` are only getting included in other files.

Naming convention
---

Linting
---

JavaScript
===

Images
===

HTML
===
