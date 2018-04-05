var AngJS = angular.module('AngJS', []);

AngJS.controller('MainCtrl', function ($scope) {
    $scope.search = "";

    $scope.selectUser = function(user){
      $scope.selectedUser = user;
    };
});

AngJS.controller('ListCtrl', function ($scope, $http) {
    $scope.limit = 12;
    $scope.users = [];
    $scope.status = null;
    $scope.mode = 1;

    $scope.ordering = {
        "field": 'name',
        "reverse": false,
        "gender": 'all'
    };

    $http.get('data/users.json')
        .success(function(data, status){
            $scope.users = data;
            $scope.status = status;
            console.info(status);
        })
        .error(function(data, status){
            $scope.users = data;
            $scope.status = status;
            console.error(status);
        });

    $scope.switch = function(){
        $scope.mode = (++$scope.mode)%2;
    };
});

AngJS.filter('gender', function() {
    return function( items, gender ) {
        var filtered = [];
        if(gender === 'all'){
            return items;
        }
        angular.forEach(items, function(item) {
            if( gender === item.gender) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});