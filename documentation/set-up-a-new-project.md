1. [Set up a new project](#set-up-a-new-project)
    1. [Install dependencies](#install-dependencies)
    2. [Enable Sentry/Raven.js](#enable-sentryravenjs)
2. [Continuous integration and deployment](#continuous-integration-and-deployment)

# Set up a new project

## Install dependencies
1. Set the live URL in the [config.js](./_gulpfile/config.js#L15) for automated sitemap generation
2. Set the live URL in the [robots.txt](./source/robots.txt#L1)
3. Set the live URL in the [.htacces](./source/.htaccess#L40) for an 404 error redirect
4. Add deployment targets to the [config.js](./_gulpfile/config.js#L17)
3. Run `npm install`
4. Run `npm start`

## Enable Sentry/Raven.js
1. Create a new project on Sentry and add your public DSN to [scripts.js](./source/assets/scripts/scripts.js#L2)
1. Uncomment Raven.js on [base.jade](./source/_partials/base.jade#L57)

## Continuous integration and deployment
If you are interested in continuous integration and deployment checkout [continuous-integration.md](./continuous-integration.md)
