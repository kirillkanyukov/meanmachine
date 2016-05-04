angular.module('mainCtrl',[])
.controller('mainController', function($rootScope, $location, Auth) {
    var vm = this;
    vm.loggedIn = Auth.isLoggedIn();
    
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();
        Auth.getUser()
        .then(function(response) {
            vm.user = response.data;
        });
    });
    
    vm.doLogin = function() {
        vm.processing = true;
        Auth.login(vm.loginData.username, vm.loginData.password)
        .then(function(data) {
            vm.processing = false;
            if (data.success) {
                $location.path('/users');
            } else {
                vm.error = data.message;
            }
            
        });
    };
    
    vm.doLogout = function() {
        Auth.logout();
        vm.user = {};
        $location.path('/login');
    };
})