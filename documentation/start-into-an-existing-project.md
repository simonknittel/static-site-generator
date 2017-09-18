1. [Start into an existing project](#start-into-an-existing-project)
  1. [External dependencies](#externel-dependencies)
  2. [Install dependencies](#install-dependencies)


# Start into an existing project


## External dependencies
1. Make sure to have the [Node Version Manager](https://github.com/creationix/nvm) installed
2. Make sure to have your `NODE_ENV` variable set to `development`
3. Run `nvm install && nvm use` to install and use the Node.js version defined in [.nvmrc](../.nvmrc)
4. Run `npm install -g -p yarn`
5. Add a pre-commit hook with `npm test`
6. (Optional) Run `yarn global add -p gulp-cli backstopjs`


## Install dependencies
1. Run `yarn` to install all dependencies.
2. Run `npm start` to build the site.
  * It will automatically open a browser tab which will reload every time you change a source file.
