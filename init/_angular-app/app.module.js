import angular from 'angular';
import * as appRoutes from './app.routes';

// Modules

// Main module
angular.module('app', []);

// Services

// Controllers
import IndexController from './modules/app/index/IndexController';
angular.module('app').controller('IndexController', IndexController);

