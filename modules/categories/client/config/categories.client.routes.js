(function () {
  'use strict';

  //Setting up route
  angular
    .module('categories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Categories state routing
    $stateProvider
      .state('view-category', {
        url: '/view-category/:categoryId',
        templateUrl: 'modules/categories/client/views/view-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm'
      }) 
	  .state('edit-category', {
        url: '/edit-category/:categoryId',
        templateUrl: 'modules/categories/client/views/edit-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm'
	  })
      .state('create-categories', {
        url: '/categories-create',
        templateUrl: 'modules/categories/client/views/create-categories.client.view.html',
        controller: 'CreateCategoriesController',
        controllerAs: 'vm'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'modules/categories/client/views/categories.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm'
      })
	  .state('saveConfirm',{
		  url: '/saveConfirm',
		  templateUrl: 'modules/categories/client/views/save-confirm.client.view.html'
	  })
	  .state('categories.list', {
        url: '/categories',
        templateUrl: 'modules/categories/client/views/categories.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm'
	  });
  }
})();
