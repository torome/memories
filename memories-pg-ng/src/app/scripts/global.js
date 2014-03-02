'use strict';

angular.module('memoriesApp')
.factory('global', function global() {

  return {
    events: {
      takePhoto: 'takePhoto',
      updatePhoto: 'updatePhoto'
    },
    flags: {
      clickMenu: false
    },
    paths: {
      home: '/',
      detail: '/detail',
      settings: '/settings',
      about: '/about'
    }
  };

});