(function() {
    'use strict';

    angular
        .module('app.candidate')
        .controller('CreateController', CreateController);

    CreateController.$inject = ['Facebook', 'AvatarService', '$window'];

    /* @ngInject */
    function CreateController(Facebook, AvatarService, $window) {
        var vm = this;
        vm.profile = {};
        vm.imgReturn = "";
        var imgBase64;
        var typeBase64;
        vm.loading = false;
        vm.loginFacebook = loginFacebook;
        vm.generateAvatar = generateAvatar;
        vm.downloadAvatar = downloadAvatar;
        vm.resetAvatar = resetAvatar;

        ////////////////

        function loginFacebook() {
			// From now on you can use the Facebook service just as Facebook api says
			Facebook.login(callbackLoginFB, {'scope': 'email, public_profile'});
        }

        function callbackLoginFB(response) {
			vm.auth = response.authResponse;
			var urlGetImg = '/'+vm.auth.userID+'/picture';
			Facebook.api(urlGetImg, {
				'width': 300
				},
				function(response) {
	        	vm.profile = response.data;
	        	convertFileToDataURLviaFileReader(vm.profile.url, returnBlob);
	      	});
		}

		function returnBlob(resp) {
			imgBase64 = resp;
			typeBase64 = imgBase64.split(',')[0] === 'data:image/jpeg;base64' ? '.jpeg' : '.png';
		}

		function convertFileToDataURLviaFileReader(url, callback) {
		  	var xhr = new XMLHttpRequest();
		  	xhr.responseType = 'blob';
		  	xhr.onload = function() {
		    	var reader = new FileReader();
		    	reader.onloadend = function() {
		      		callback(reader.result);
		    	}
		    	reader.readAsDataURL(xhr.response);
		  	};
		  	xhr.open('GET', url);
		  	xhr.send();
		}

		function generateAvatar() {
			vm.loading = true;
			var img = {
				base: imgBase64,
				type: typeBase64
			};
			AvatarService.Create(img)
        		.then(
        			function(response){
        				vm.imgReturn = response.data;
        				vm.loading = false;
        			},
        			function(err){
        				console.log(err);
        			}
        		);
		}

		function downloadAvatar() {
			$window.open(vm.imgReturn, '_blank');
		}

		function resetAvatar() {
			Facebook.logout();
			var imgBase64 = undefined;
        	var typeBase64 = undefined;
        	vm.imgReturn = "";
        	vm.profile = {};
		}
    }
})();