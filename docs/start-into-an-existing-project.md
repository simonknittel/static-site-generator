1. [Start into an existing project](#start-into-an-existing-project)
    1. [External dependencies](#externel-dependencies)
    2. [Install dependencies](#install-dependencies)


# Start into an existing project


## External dependencies
1. Make sure to have the [Node Version Manager](https://github.com/creationix/nvm) installed.
2. Make sure to have the environmental variable `NODE_ENV` set to `development`.
3. Run `nvm install && nvm use` to install and use the Node.js version defined in [.nvmrc](../.nvmrc).
5. (Optional) Add a pre-commit hook which runs `npm test`.
6. (Optional) Run `npm install -g -p gulp-cli`.


## Install dependencies
1. Run `npm install` to install the dependencies.
2. Run `npm start` to build the site.
  * This command will automatically open a new browser tab which will reload every time you change a source file.
