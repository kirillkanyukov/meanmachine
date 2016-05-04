angular.module('userCtrl', ['userService'])
.controller('userController', function(User) {
    var vm = this;
    vm.processing = true;
    User.all()
    .then(function(response) {
        vm.processing = false;
        vm.users = response.data;
    });
})