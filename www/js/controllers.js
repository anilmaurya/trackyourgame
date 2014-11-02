angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('GamesCtrl', function($scope, $http, $window, $ionicModal) {
  //$scope.games = Games.all();
    $http({ method: 'GET', 
            url: 'http://localhost:3000/games?token='+$window.localStorage.token, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
          $scope.games = data
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
      })
    
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.createGame = function(game){
    $http({ method: 'POST', 
            url: 'http://localhost:3000/games', 
            data: {name: game.name}, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
        $scope.games.push({id: data.id, name: data.name});
        $scope.modal.hide();
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
     })
    }
})

.controller('GameDetailCtrl', function($scope, $stateParams, Games) {
  $scope.game = Games.get($stateParams.gameId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('SignupCtrl', function($scope, $http, $state, $window){
  $scope.Signup = function(user){
    $http({ method: 'POST', 
            url: 'http://localhost:3000/signup', 
            data: user, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
        $window.localStorage.setItem('token', data.token)
        $state.go('tab.dash')
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
      })
    
  }
})
.controller('LoginCtrl', function($scope, $http, $state, $window){
  $scope.Login = function(user){
    $http({ method: 'POST', 
            url: 'http://localhost:3000/login', 
            data: user, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
        $window.localStorage.setItem('token', data.token)
        $state.go('tab.dash')
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
      })
  }
});
