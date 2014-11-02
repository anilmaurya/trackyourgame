angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Games', function($http, $window) {
  // Might use a resource here that returns a JSON array
  var games = []
/*
    $http({ method: 'GET', 
            url: 'http://localhost:3000/games?token='+$window.localStorage.token, 
            headers: {
                        "Content-Type": "application/json",
                    }
        })
      .success(function(data, status, headers, config){
          console.log(data)
          games = data
      })
      .error(function(data, status, headers, config){
        console.log("Error occurred.  Status:" + status);
      })
*/

  return {
    all: function() {
      return games;
    },
    get: function(gameId) {
      // Simple index lookup
      return games[gameId];
    }
  }
});
