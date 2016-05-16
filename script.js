var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('MainController',['$scope', '$http', function($scope, $http) {
    $scope.switchUnit = function() {
        if ($scope.degree == 'F') {
            $scope.degree = 'C';
            $scope.temp = Number(($scope.temp * 1.8) + 32).toFixed(0);
        } else {
            $scope.degree = 'F';
            $scope.temp = Number(($scope.temp - 32) * 1.8).toFixed(0);
        }
    }
    $scope.switchUnit();

    var appid = "bdce302f248942133e459bb379e2e67b";

    $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK").success(function(loc) {
        var town = loc.city;
        var country = loc.country;
        $scope.location = town + ',' + country;
        var url = '{0}&APPID={3}'.lp_format('http://api.openweathermap.org/data/2.5/weather?q=?', $scope.location, appid);
        l(url);
        $http.get(url)
             .then(function(data2) {
                        l(9);
                        var temp = Number(data2.main.temp.toString().slice(0, data2.main.temp.toString().indexOf('.') - 1));
                        var weather = data2.weather[0].description;
                        var windspeed = data2.wind.speed;
                        var windDirection = Number(data2.wind.deg);
                        if (temp <= -4) $scope.background = 'back.hot';
                        if (temp <= 10) $scope.background = 'back-temperate';
                        if (temp <= 27) $scope.background = 'back-cold'
                        // if (temp <= -4) $bod.style.backgroundImage = 'url("http://41.media.tumblr.com/9c97ccb9aa1e7d68632b45f2d409afe2/tumblr_mw87reA3de1sfie3io1_1280.jpg")';
                        // if (temp <= 10) $bod.style.backgroundImage = 'url("https://snap-photos.s3.amazonaws.com/img-thumbs/960w/BACDD98653.jpg")';
                        // if (temp <= 27) $bod.style.backgroundImage = 'url("https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WBDINSMDFO.jpg")';
                        if      (windDirection <= 22.5 || windDirection > 337.5) windDirection = 'N';
                        else if (windDirection <= 67.5) windDirection = 'NE';
                        else if (windDirection <= 107.5) windDirection = 'E';
                        else if (windDirection <= 152.5) windDirection = 'SE';
                        else if (windDirection <= 202.5) windDirection = 'S';
                        else if (windDirection <= 247.5) windDirection = 'SW';
                        else if (windDirection <= 292.5) windDirection = 'W';
                        else if (windDirection <= 337.5) windDirection = 'NW';
                        $scope.degree = (' C');
                        $scope.conditions = weather;
                        $scope.wind = '{0}, {1}'.lp_format(windDirection, windspeed);
                        $scope.temp = temp;
                    }
                    ,
                    function(err) {
                        l(2);
                       l(err);
                    });
        
    });

    navigator.geolocation.getCurrentPosition(function(loc) {
        $http.get('{0}{1},{2}'.lp_format( '//maps.googleapis.com/maps/api/geocode/json?latlng=',
                                            loc.coords.latitude,
                                            loc.coords.longitude))
              .then(function(data){
                    }
                    ,function(err) {
                        l(1);
                        l(err);
                    }
                );


        // $.getJSON(
        //     '{0}{1},{2}'.lp_format(
        //         'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
        //         loc.coords.latitude,
        //         loc.coords.longitude),
        //     function(data) {
        //         var town = data.results[0].address_components[3].long_name;
        //         var state = data.results[0].address_components[6].long_name;
        //         $.getJSON(
        //             '{0}lat={1}&lon={2}'.lp_format(
        //                 'http://api.openweathermap.org/data/2.5/weather?',
        //                 Number(loc.coords.latitude.toFixed(0)),
        //                 Number(loc.coords.longitude.toFixed(0))),
        //             function(data2) {
        //                 var temp = Number(data2.main.temp.toString().slice(0, data2.main.temp.toString().indexOf('.') - 1));
        //                 var weather = data2.weather[0].description;
        //                 var windspeed = data2.wind.speed;
        //                 var windDirection = Number(data2.wind.deg);
        //                 var $bod = document.querySelector('body');
        //                 if (temp <= -4) $bod.style.backgroundImage = 'url("http://41.media.tumblr.com/9c97ccb9aa1e7d68632b45f2d409afe2/tumblr_mw87reA3de1sfie3io1_1280.jpg")';
        //                 if (temp <= 10) $bod.style.backgroundImage = 'url("https://snap-photos.s3.amazonaws.com/img-thumbs/960w/BACDD98653.jpg")';
        //                 if (temp <= 27) $bod.style.backgroundImage = 'url("https://snap-photos.s3.amazonaws.com/img-thumbs/960w/WBDINSMDFO.jpg")';
        //                 else $bod.style.backgroundImage = 'url("https://snap-photos.s3.amazonaws.com/img-thumbs/960w/LN7YQAQ95P.jpg")';
        //                 if (windDirection <= 22.5 || windDirection > 337.5) windDirection = 'N';
        //                 else if (windDirection <= 67.5) windDirection = 'NE';
        //                 else if (windDirection <= 107.5) windDirection = 'E';
        //                 else if (windDirection <= 152.5) windDirection = 'SE';
        //                 else if (windDirection <= 202.5) windDirection = 'S';
        //                 else if (windDirection <= 247.5) windDirection = 'SW';
        //                 else if (windDirection <= 292.5) windDirection = 'W';
        //                 else if (windDirection <= 337.5) windDirection = 'NW';
        //                 $scope.location = '{0}, {1}'.lp_format(town, state);
        //                 $scope.degree = (' C');
        //                 $scope.conditions = weather;
        //                 $scope.wind = '{0}, {1}'.lp_format(windDirection, windspeed);
        //                 $scope.temp = temp;
        //             }
        //         );
        //     }
        // );
    });
}]);

function l(message) {
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