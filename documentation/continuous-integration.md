1. [Continuous integration and deployment](#continuous-integration-and-deployment)
    1. [Travis CI](#travis-ci)
    2. [Codeship](#codeship)
        1. [Continuous deployment](#continuous-deployment)
    3. [CircleCI](#circleci)


# Continuous integration and deployment
Here are some examples on how to add a continuous integration and deployment service to your project.


## Travis CI
1. Enable your repository in Travis CI
2. Activate the setting: `Build only if .travis.yml is present`
3. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` and fill it with a [personal access token](https://github.com/settings/tokens) from GitHub
4. (Optional) Add a status badge to your README.md (https://docs.travis-ci.com/user/status-images/)


## Codeship
1. Add the following to the `Setup Commands`:

```shell
nvm install 6.8.1
npm install -g yarn jspm

jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN

yarn
```

2. Add the following to `Configure Test Pipelines`:

```shell
npm test
```

3. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` and fill it with a [personal access token](https://github.com/settings/tokens) from GitHub

4. (Optional) Add a status badge to your README.md (https://codeship.com/documentation/faq/codeship-badge/)

### Continuous deployment
On Codeship you can add continuous deployment pipelines to specific branches of your repository. I have added a gulp deployment task with three possible targets which you can define in the [config.js](../_gulpfile/config.js). Example:

```shell
npm install -g gulpjs/gulp-cli#4.0
gulp deploy --target=production
```


## CircleCI
1. Add your project under https://circleci.com/add-projects
2. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` under the project settings and fill it with a [personal access token](https://github.com/settings/tokens) from GitHub
3. (Optional) Add a status badge to your README.md (https://circleci.com/docs/status-badges/)
