(function() {
  'use strict';

  // Categories module config
  angular
    .module('categories')
    .run(menuConfig);

  //menuConfig.$inject = ['Menus'];
  menuConfig.$inject = ['menuService'];

  //function menuConfig(Menus) {
  function menuConfig(menuService){
    // Config logic
    menuService.addMenuItem('topbar', {
      title: 'Categories',
      state: 'categories',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'categories', {
      title: 'List Categories',
      state: 'categories',
      roles: ['*']
    });
      
   // Add the dropdown New Categories
    menuService.addSubMenuItem('topbar', 'categories', {
        title: 'New Categories',
        state: 'create-categories',
        roles:['*']
    })
  }
})();
