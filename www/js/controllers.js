angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('GamesCtrl', function($scope, Games) {
  $scope.games = Games.all();
})

.controller('GameDetailCtrl', function($scope, $stateParams, Games) {
  $scope.game = Games.get($stateParams.gameId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('LoginCtrl', function($scope, $http, $state, $window){
  $scope.tryLogin = function(user){
    $http({ method: 'POST', 
            url: 'http://localhost:3000/login', 
            data: user, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
        $window.localStorage.setItem('token', data['token'])
        $state.go('tab.dash')
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
      })
  }
});
