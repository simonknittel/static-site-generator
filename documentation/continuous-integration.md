1. [Continuous integration and deployment](#continuous-integration-and-deployment)
    1. [Travis CI](#travis-ci)
    2. [Codeship](#codeship)
        1. [Continuous deployment](#continuous-deployment)

# Continuous integration and deployment
Here are some examples on how to add a continuous integration and deployment service to your project.

## Travis CI
1. Enable your repository in Travis CI
2. Activate the setting: `Build only if .travis.yml is present`
3. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` and fill it with a [personal access token](https://github.com/settings/tokens) from GitHub
4. (Optional) Add a status badge to your README.md with:

```markdown
[![Build Status](https://travis-ci.org/USERNAME/REPOSITORY?branch=BRANCH)](https://travis-ci.org/USERNAME/REPOSITORY)
```

## Codeship
1. Add the following to the `Setup Commands`:

```shell
nvm install 6.2.0
npm install -g jspm
jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN

npm install
```

2. Add the following to `Configure Test Pipelines`:

```shell
npm test
```

3. Add an environmental variable called `JSPM_GITHUB_AUTH_TOKEN` and fill it with a [personal access token](https://github.com/settings/tokens) from GitHub

4. (Optional) Add a status badge to your README.md with:

```markdown
[![Build Status](https://codeship.com/projects/PROJECT-UUID/status?branch=BRNACH)](https://codeship.com/projects/ID)
```

### Continuous deployment
On Codeship you can add continuous deployment pipelines to specific branches of your repository. I have added a gulp deployment task with three possible targets which you can define in the [config.js](../_gulpfile/config.js). Example:

```shell
npm install -g gulpjs/gulp-cli#4.0
gulp deploy --target=live
```
