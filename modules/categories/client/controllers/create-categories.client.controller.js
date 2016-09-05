(function() {
  'use strict';

  angular
    .module('categories')
    .controller('CreateCategoriesController', CreateCategoriesController);

  CreateCategoriesController.$inject = ['$scope', '$location', 'categoriesService'];

  function CreateCategoriesController($scope, $location, categoriesService) {
    var vm = this;

    // Create categories controller logic
    // ...
	
	// Create new Category
	$scope.create = function(){
		
		var category = new categoriesService({
			name: this.name,
			description: this.description
		});
		category.$save(function(response){
			//Redirect after save
			$location.path('saveConfirm');
		
			// Clear form fields
			$scope.name='';
		}, function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};
    init();

    function init() {
    }
  }
})();
