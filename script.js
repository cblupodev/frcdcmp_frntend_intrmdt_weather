var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('MainController',['$scope', '$http', function($scope, $http) {

    // switch between fahrenheit and celsius temperature units
    $scope.switchUnit = function() {
        if ($scope.degree == 'F') {
            $scope.degree = 'C';
            $scope.temp = Number(($scope.temp - 32) / 1.8).toFixed(0);
        } else {
          l($scope.temp);
            $scope.degree = 'F';
            $scope.temp = Number(($scope.temp * 1.8) + 32).toFixed(0);
        }
    }

    var appid = "bdce302f248942133e459bb379e2e67b"; // appid for openweathermap

    // get ip location
    $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK").success(function(loc) {
        var town = loc.city;
        var country = loc.country;
        $scope.location = town + ',' + country;

        // url to send to openweathermap
        var url = '{0}{1}{3}&APPID={2}'.lp_format('http://api.openweathermap.org/data/2.5/weather?q=?', $scope.location, appid, "&units=metric");
        l(url);

        // get data from openweathermap
        $http.get(url)
             .then(function(data2) {
                    var temp = Number(data2.data.main.temp).toFixed(0);
                    var weather = data2.data.weather[0].description;
                    var windspeed = data2.data.wind.speed;
                    var windDirection = Number(data2.data.wind.deg);

                    // change the background style based on temperature
                    if (temp <= -4)      $scope.background = 'back-cold';
                    else if (temp <= 27) $scope.background = 'back-temperate';
                    else                 $scope.background = 'back-hot';

                    // display different cardinal wind direction
                    if      (windDirection <= 22.5 || windDirection > 337.5) windDirection = 'N';
                    else if (windDirection <= 67.5) windDirection = 'NE';
                    else if (windDirection <= 107.5) windDirection = 'E';
                    else if (windDirection <= 152.5) windDirection = 'SE';
                    else if (windDirection <= 202.5) windDirection = 'S';
                    else if (windDirection <= 247.5) windDirection = 'SW';
                    else if (windDirection <= 292.5) windDirection = 'W';
                    else if (windDirection <= 337.5) windDirection = 'NW';


                    $scope.degree = ('C');
                    $scope.conditions = weather;
                    $scope.wind = '{0}, {1} mph'.lp_format(windDirection, windspeed);
                    $scope.temp = temp;

                    // openweathermap returns temperature in celsius switch it to fahrenheit before the user sees
                    $scope.switchUnit();
                }
                ,
                function(err) {
                   l(err);
                });

    });
}]);

// shortcut for console.log()
function l (message) {
  console.log(message);
}

// '{0}{1}'.lp_format('asdf', 1 + 2);
if (!String.prototype.format) {
  String.prototype.lp_format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}