(function() {
    'use strict';

    angular
        .module('app.candidate')
        .factory('AvatarService', AvatarService);

    AvatarService.$inject = ['$http', '$q', 'app.settings'];

    /* @ngInject */
    function AvatarService($http, $q, settings) {
        var service = {
            Create: Create
        };
        return service;

        ////////////////

        function Create(img) {
        	var deferred = $q.defer();
            var promise = $http.post(settings.url_service+'/image', img)
                .then(
                    function (response){
                        deferred.resolve(response);
                    }, 
                    function (err){
                        deferred.reject(err);
                    }
                );
            return deferred.promise;
        }
    }
})();