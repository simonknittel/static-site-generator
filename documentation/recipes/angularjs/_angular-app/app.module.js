import angular from 'angular';
import 'angular-ui-router';

// Modules
import './modules/index/index.module';

// Main module
angular.module('app', ['ui.router', 'index']);

// Services

// Controllers

// Filters
import trustFilter from './shared/trust.filter';
angular.module('app').filter('trust', trustFilter);

angular.module('app').config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'assets/js/_angular-app/modules/index/index.template.html',
        });
});
