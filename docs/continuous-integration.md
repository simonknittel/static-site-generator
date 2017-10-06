1. [Continuous integration and deployment](#continuous-integration-and-deployment)
    1. [GitLab CI](#gitlab-ci)
    2. [Codeship](#codeship)
    3. [Bitbucket Pipelines](#bitbucket-pipelines)
    4. [Travis CI](#travis-ci)
    5. [CircleCI](#circleci)
    6. [AppVeyor](#appveyor)


# Continuous integration and deployment
Here are some examples on how to add a continuous integration and deployment service to your project.


## GitLab CI
_wip_


## Codeship
1. Add the following to the `Setup Commands`:

```shell
nvm install 8.5.0
npm install -g -p yarn@1.0.2

yarn
```

2. Add the following to `Configure Test Pipelines`:

```shell
RAVEN_ENVIRONMENT="$CI_BRANCH" # git rev-parse --abbrev-ref HEAD
RAVEN_COMMIT="$(git describe --tags)"
RAVEN_RELEASE="$RAVEN_COMMIT" # Will be the tag itself when merge to master/production branch

sed -i "s/environment: 'development'/environment: '$RAVEN_ENVIRONMENT'/g" ./src/_partials/base.pug
sed -i "s/\/\/ tags: { git_commit: '' },/tags: { git_commit: '$RAVEN_COMMIT' },/g" ./src/_partials/base.pug

if [ "$RAVEN_ENVIRONMENT" = "master" ]; then sed -i "s/\/\/ release: '',/release: '$RAVEN_RELEASE'/g" ./src/_partials/base.pug; fi

npm test
```

3. Add `Deployment Pipelines` for your branches:

```shell
ssh username@host "mkdir -p new_integration"
rsync -r dist/ username@host:new_integration
ssh username@host "cd html/white-label-shop && { mv integration old_integration; mv new_integration integration; rm -rf old_integration; }"
```

4. (Optional) Add a status badge to your README.md (https://codeship.com/documentation/faq/codeship-badge/)

_wip_


## Bitbucket Pipelines
_wip_


## Travis CI
1. Enable your repository in Travis CI
2. Activate the setting: `Build only if .travis.yml is present`
3. (Optional) Add a status badge to your README.md (https://docs.travis-ci.com/user/status-images/)

_wip_


## CircleCI
1. Add your project under https://circleci.com/add-projects
2. (Optional) Add a status badge to your README.md (https://circleci.com/docs/status-badges/)

_wip_


## AppVeyor
1. Check `Skip branches without appveyor.yml` under `Settings > General`

_wip_
