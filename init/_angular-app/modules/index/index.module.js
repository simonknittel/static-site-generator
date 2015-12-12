import angular from 'angular';
import '../../shared/dirDisqus';
import '../../shared/angular-gist';

// Modules

// Main module
angular.module('index', []);

// Services

// Controllers
import IndexController from './index.controller';
angular.module('index').controller('IndexController', IndexController);

// Filters
