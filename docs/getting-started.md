1. [Set up a new project](#set-up-a-new-project)
    1. [External dependencies](#external-dependencies)
    2. [Install dependencies and set the production URL](#install-dependencies-and-set-the-production-url)
    3. [Update your CODEOWNERS file](#update-your-codeowners-file)
    4. [Enable Sentry/Raven.js](#enable-sentryravenjs)
    5. [Continuous integration and deployment](#continuous-integration-and-deployment)
    <!-- 6. [Enable greenkeeper](#enable-greenkeeper) -->


# Set up a new project


## External dependencies
1. Make sure to have the [Node Version Manager](https://github.com/creationix/nvm) installed.
2. Make sure to have your `NODE_ENV` variable set to `development`.
3. Run `nvm install && nvm use` to install and use the Node version defined in [.nvmrc](../.nvmrc).
5. (Optional) Add a pre-commit hook which runs `npm test`.
6. (Optional) Run `npm install -g -p gulp-cli`.


## Install dependencies and set the production URL
1. Set the production URL in the [config.js](../_gulpfile/config.js#L15) for automated sitemap generation
2. Set the production URL in the [robots.txt](../src/robots.txt#L1)
3. Set the production URL in the [.htaccess](../src/.htaccess#L42) for an 404 error redirect
4. Run `npm install` to install the dependencies.
5. Run `npm start` to build the site.
  * This command will automatically open a new browser tab which will reload every time you change a source file.


## Update your [CODEOWNERS](../.github/CODEOWNERS) file
See [About CODEOWNERS](https://help.github.com/articles/about-codeowners) for more information.


## Enable Sentry/Raven.js
1. Create a new project on Sentry and add your public DSN to [base.pug](../src/_templates/base.pug#L65)
2. Uncomment Raven.js in [base.pug](../src/_templates/base.pug#L63)


## Continuous integration and deployment
If you are interested in continuous integration and deployment checkout [continuous-integration.md](./continuous-integration.md)


<!--
## Enable Greenkeeper (https://greenkeeper.io/)
1. Make sure to have Greenkeeper globally installed (`npm install -g greenkeeper && greenkeeper login`)
2. Enable Greenkeeper for your repository by running `greenkeeper enable`
-->
