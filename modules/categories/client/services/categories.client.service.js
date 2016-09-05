(function () {
  'use strict';

  angular
    .module('categories')
    .factory('categoriesService', categoriesService);

  categoriesService.$inject = ['$resource'];

  function categoriesService($resource) {
    // Categories service logic
    // ...

    // Public API
    return $resource('categories/:categoryId', {categoryId: '@_id'}, {update: {method: 'PUT'}});
  }
})();
