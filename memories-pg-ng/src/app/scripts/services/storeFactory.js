'use strict';

angular.module('memoriesApp')
.factory('storeFactory', function storeFactory() {

  // simple data store using localstorage
  function Store(name, single) {
    this.singleMode = !!single;
    this.name = name;
    var dataStr = this.singleMode? '[{"id": 1}]' : '[]';
    var data = window.localStorage.getItem(this.name) || dataStr;
    this.list = angular.fromJson(data);
  }

  Store.prototype._sync = function() {
    var value = angular.toJson(this.list);
    window.localStorage.setItem(this.name, value);
  };

  Store.prototype.add = function(data, callback) {
    if (singleMode) {
      callback(true, 'Single data store can not add data!');
      return;
    }

    if (angular.isObject(data)) {
      data.id = new Date().getTime();
      data.time = moment().format('YYYY-MM-DD hh:mm:ss');
      this.list.push(data);
      this._sync();   
      callback();
    } else {
      callback(true, 'Your data must be a object!');
    }
  };

  Store.prototype.getList = function(callback) {
    callback(null, this.list);
  };

  Store.prototype.getItem = function(key, callback) {
    if (arguments.length === 1) {
      callback = key;
      key = undefined;
    }

    var itemObj;
    if (this.singleMode) {
      itemObj = this.list[0];
    } else {
      key = +key || 0;
      itemObj = _.find(this.list, function(item) {
        return key == item.id;
      });      
    }

    if (itemObj) {
      callback(null, itemObj);
    } else {
      callback(true, 'Your key is invalid or not exist!');
    }
  };

  Store.prototype.updateItem = function(itemObj, callback) {
    if (!itemObj || !itemObj.id) {
      callback(true, 'Your data is invalid!');
      return;
    }

    var index = -1;
    if (this.singleMode) {
      index = 0;
    } else {
      index = _.findIndex(this.list, function(item) {
        return itemObj.id == item.id;
      });
    }
    if (index >= 0) {
      callback();
    } else {
      callback(true, 'Your data is invalid!');
    }
  };

  Store.prototype.remove = function(key, callback) {
    if (arguments.length === 1) {
      callback = key;
      key = undefined;
    }

    if (this.singleMode) {
      callback(true, 'Single data store can not invoke remove!');
      return;
    }    
    var removedItems;
    key = +key || 0;
    removedItems = _.remove(this.list, function(item) {
      return key == item.id;
    });
    if (removedItems && removedItems.length) {
      this._sync();
      callback();
    } else {
      callback(true, 'Your key is invalid or not exist!');
    }
  };

  var cache = {};
  function _getStore(name, single) {
    var key = name + !!single;
    if (name) {
      var store = cache[key];
      if (!store) {
        store = new Store(name, single);
        cache[key] = store;
      }
      return store;
    } else {
      return null;
    }
  }

  return {
    get: _getStore
  };
  
});