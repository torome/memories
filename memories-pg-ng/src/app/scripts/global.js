'use strict';

angular.module('memoriesApp')
.service('global', function global() {

  return {
    events: {
      takePhoto: 'takePhoto'
    },
    flags: {
      clickMenu: false
    }
  };

});