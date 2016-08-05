(function() {
    'use strict';

	angular
		.module('app.candidate')
		.run(Run)
        .config(Config)
        .constant('app.settings', {
        	//url_service: 'http://localhost:3020'
        	url_service: 'https://meu-candidato.herokuapp.com'
        });

    /* @ngInject */
	Config.$inject = ['FacebookProvider'];

	/**
	* @namespace Config
	* @desc Config app
	*/
    function Config(FacebookProvider) {
        // Facebook id app
        FacebookProvider.init('607672736080770');
    }

	/* @ngInject */
	Run.$inject = [];

	/**
	* @namespace Run
	* @desc Run config
	*/
    function Run() {
        
    }

})();