angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('GamesCtrl', function($scope, $http, $window, $ionicModal) {
  //$scope.games = Games.all();
    $http({ method: 'GET', 
            url: 'http://127.0.0.1:3000/games?token='+$window.localStorage.token, 
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
            url: 'http://127.0.0.1:3000/games', 
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

.controller('GameDetailCtrl', function($scope, $stateParams, $http, $window, $ionicModal) {
  console.log('in game detail')
  //$scope.game = Games.get($stateParams.gameId);
    $http({ method: 'GET', 
            url: 'http://127.0.0.1:3000/games/'+$stateParams.gameId+'?token='+$window.localStorage.token, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
          $scope.game = data['game']
          $scope.players = data['players']
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
      })
    $ionicModal.fromTemplateUrl('templates/add_player.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.addPlayer = function(player){
    $http({ method: 'POST', 
            url: 'http://127.0.0.1:3000/players', 
            data: {number: player.number, game_id: $stateParams.gameId}, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
        $scope.players.push({id: data.id, name: data.name});
        $scope.modal.hide();
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
     })
    }
})

.controller('AccountCtrl', function($scope) {
})

.controller('SignupCtrl', function($scope, $http, $state, $window){
  $scope.Signup = function(user){
    $http({ method: 'POST', 
            url: 'http://127.0.0.1:3000/signup', 
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
            url: 'http://127.0.0.1:3000/login', 
            data: user,
            crossDomain: true, 
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
