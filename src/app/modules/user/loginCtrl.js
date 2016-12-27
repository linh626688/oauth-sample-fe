'use strict';

angular
    .module('user')
    .controller('loginCtrl',
    function ($scope, $rootScope, $location, $window, $cookies, userService, oauthService, $auth) {

        $scope.initData = initData;
        $scope.authenticate = authenticate;
        $scope.exchangeToken = exchangeToken;

        function initData() {
            console.log("Login Controller...");
        }

        function authenticate(provider) {
            $auth
                .authenticate(provider)
                .then(function() {
                    exchangeToken(provider, $auth.getToken());
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function exchangeToken(provider, accessToken) {
            var opts = {
                provider: provider,
                data: {
                    token: accessToken
                }
            };
            oauthService.exchangeToken(
                opts,
                function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.initData();
    });
