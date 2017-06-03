1. [Set up a new project](#set-up-a-new-project)
    1. [Install dependencies](#install-dependencies)
    2. [Enable Sentry/Raven.js](#enable-sentryravenjs)
    3. [Continuous integration and deployment](#continuous-integration-and-deployment)
    <!-- 4. [Enable greenkeeper](#enable-greenkeeper) -->
    5. [Enable performance metrics](#enable-performance-metrics)


# Set up a new project


## External dependencies
1. Make sure to have the [Node Version Manager](https://github.com/creationix/nvm) installed
2. Make sure to have your `NODE_ENV` variable set to `development`
3. Run `nvm install && nvm use` to install and use the Node version defined in [.nvmrc](../.nvmrc)
4. Run `npm install -g yarn`
5. (Optional) Run `npm install -g -p jspm backstopjs`


## Install dependencies and set the production URL
1. Set the production URL in the [config.js](../_gulpfile/config.js#L15) for automated sitemap generation
2. Set the production URL in the [robots.txt](../source/robots.txt#L1)
3. Set the production URL in the [.htaccess](../source/.htaccess#L42) for an 404 error redirect
4. Add deployment targets to the [config.js](../_gulpfile/config.js#L17)
5. Run `yarn` to install all dependencies.
6. Run `npm start` to build the site.
    * It will automatically open a browser tab which will reload every time you change a source file.


## Enable Sentry/Raven.js
1. Create a new project on Sentry and add your public DSN to [scripts.js](../source/assets/scripts/scripts.js#L1)
2. Uncomment Raven.js on [base.pug](../source/_partials/base.pug#L63)


## Continuous integration and deployment
If you are interested in continuous integration and deployment checkout [continuous-integration.md](./continuous-integration.md)


<!--
## Enable Greenkeeper (https://greenkeeper.io/)
1. Make sure to have Greenkeeper globally installed (`npm install -g greenkeeper && greenkeeper login`)
2. Enable Greenkeeper for your repository by running `greenkeeper enable`
-->


## Enable performance metrics
1. Pull the Docker image of StatsD/Graphite by running `docker pull hopsoft/graphite-statsd`
2. Spin up your StatsD/Graphite server/Docker container by running `docker run -d --name graphite --restart=always -p 80:80 -p 2003-2004:2003-2004 -p 2023-2024:2023-2024 -p 8125:8125/udp -p 8126:8126 hopsoft/graphite-statsd`
3. Run the following code on your continious integration service after the result of the commit was deployed to your test server
4. Compose your Graphs on your Graphite and add them to the your Graphite dashboard

### Add
```shell
npm install -g -p phantomas phantomjs-prebuilt@2.1.14
phantomas <url of the test server> -R statsd:<url of the StatsD server/Docker container>:<port of the StatsD server/Docker container>:staticSiteGenerator.front
```

### ToDo
* Convert to non time based graph
* Tag the events with `git describe --tags`
