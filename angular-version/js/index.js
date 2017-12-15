(function() {
  'use strict';

  angular.module('sparkadd', [])
    .controller('sparkController', ['$scope', '$http', sparkController]);

  function sparkController($scope, $http) {
    // Debouncing auto-updates:
    $scope.modelOptions = {
      debounce: 500,
    };

    //Check token:
    $scope.checkToken = function() {
      $http({
        method: 'GET',
        url: 'https://api.ciscospark.com/v1/people/me',
        headers: {
          'Authorization': 'Bearer ' + $scope.token,
        }
      }).then(function(response) {
        $scope.validToken = true;
        $scope.username = response.data.displayName;
        //Then get room-list if token is valid
        $http({
          method: 'GET',
          url: 'https://api.ciscospark.com/v1/rooms',
          headers: {
            'Authorization': 'Bearer ' + $scope.token,
          }
        }).then(function(response) {
          $scope.roomList = response.data.items;
        },
        function(response) {
          alert('Could not retreive room list. Plese reload and try again!');
        });
      }, function(response) {
        $scope.validToken = false;
      });
    };

    //Check room:

    $scope.checkRoom = function(room) {
      var filtered = $scope.roomList.filter(function(item) {
        return item.title == room;
      });
      if (filtered.length == 1) {
        $scope.validRoom = true;
        $scope.roomId = filtered[0].id;
        console.log($scope.roomId);
      }
      else {
        $scope.validRoom = false;
      }
    }

    //Clear all function:
    $scope.clear = function() {
      $scope.data = [];
    };

    //Handling row removal
    $scope.delete = function() {
      $scope.data.splice($scope.data.indexOf($scope.user), 1)
    };

    //Handling row creation
    $scope.add = function(nname, nemail) {
      // Future input validation
      if (true){
        var newData = {'name': nname,
                       'email': nemail,
                       'status': 'pending',};
        $scope.data.push(newData);
      }
      else {
        alert('Please veryfy the required fields!');
      }
    };

    //Handling file upload
    $scope.upload = function() {
      document.querySelector('#upload-input').click();
    };

    //Read data
    $scope.readFile = function(ele) {
      var csvFile = ele.files;
      var reader = new FileReader();
      reader.onload = function(e) {
        var content = e.target.result;
        // Create rows:
        var rows = content.split('\n');
        rows.forEach(function(currentRow){
          if (currentRow != '') {
            var columns = currentRow.split(',');
            var newData = {'name': columns[0],
                           'email': columns[1],
                           'status': 'pending',};
            $scope.data.push(newData);
            $scope.$apply();
          }
        });
      };
      reader.readAsText(csvFile[0]);
    };

    $scope.username = '';
    $scope.roomId = '';
    $scope.validRoom = false;
    $scope.validToken = false;
    $scope.data = [];
  }
}());
