1. [Set up a new project](#set-up-a-new-project)
    1. [Manual start](#manual-start)
        1. [Install dependencies](#install-dependencies)

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

5. Add Continuous Deployment with

```shell
npm install -g gulpjs/gulp-cli#4.0
gulp production
lftp -c "open -u $FTP_USER,$FTP_PASSWORD simonknittel.de; set ssl:verify-certificate no; mirror -R --delete ${HOME}/clone/build/ /path/on/the/server"
```

6. Add two environmental variables called `FTP_USER` and `FTP_PASSWORD`

Alternatively, use the Gulp deployment task:

```shell
npm install -g gulpjs/gulp-cli#4.0
gulp deploy
```

### Enable Sentry/Raven.js
1. Create a new project on Sentry and add your public DSN to [scripts.js](./source/assets/scripts/scripts.js#L2)
1. Uncomment Raven.js on [base.jade](./source/_partials/base.jade#L57)
