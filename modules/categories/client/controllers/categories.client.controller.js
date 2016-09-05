(function() {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', 'categoriesService', '$location', '$stateParams', '$state'];

  function CategoriesController($scope, categoriesService, $location, $stateParams, $state) {
    var vm = this;

    // Categories controller logic
    // ...

	// Find a list of Categories
	$scope.find = function(){
		//hard coded data
	//$scope.categories=[{'name': 'Veverages',
	//					'description': 'Soft drinks, coffees, teas, beers, and ales'},
	//					{'name': 'Condiments',
	//					'description': 'Sweet and savory sauces, relishes, spreads, and seasonings'}];
	$scope.categories=categoriesService.query();
	console.log($location.url());
	};
	
	// Remove the existing category
	$scope.remove = function(category) {
		if(category) {
			category.$remove();
			
			for(var i in $scope.categories) {
				if($scope.categories[i] === category){
					$scope.catefories.splice(i,1);
				}
			}
		} else {
			$scope.category.$remove(function() {
				$location.path('categories');
			});
		}
		
	};
	
	
	// Edit the existing category
	$scope.edit = function(){
		
		var category = $scope.category;
		category.$update(function(){
			$state.go('view-category', {categoryId: category._id});
			//$location.path('view-category/'+ category._id);
		});

  };
	
	// Find existing Category
	$scope.findOne = function() {
		$scope.category = categoriesService.get({
			categoryId: $stateParams.categoryId
		});
		//$resource('categories/:categoryId', {categoryId: '@_id'}, {update: {method: 'PUT'}});
		console.dir($stateParams);
	};
	
    init();

    function init() {
    }
  }
})();
