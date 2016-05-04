angular.module('userApp',[
    'ngAnimate',
    'app.routes',
    'authService',
    'userService',
    'mainCtrl',
    'userCtrl'
])
.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);