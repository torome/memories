'use strict';

angular.module('memoriesApp')
.factory('storeFactory', function storeFactory() {

  // simple data store using localstorage
  function Store(name) {
    this.name = name;
    var data = window.localStorage.getItem(this.name) || '[]';
    this.list = angular.fromJson(data);
    this.counter = this.list.length;
    this.keys = _.map(this.list, function(item) {
      return +item.id;
    });
    this.cleanup = null;
  }

  Store.prototype._sync = function() {
    var value = angular.toJson(this.list);
    window.localStorage.setItem(this.name, value);
  };

  Store.prototype.add = function(data, callback) {
    if (angular.isObject(data)) {
      this.counter++;
      data.id = this.counter;
      data.time = moment().format('YYYY-MM-DD hh:mm:ss');
      this.list.push(data);
      this.keys.push(data.id);
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
    var itemObj;
    key = +key || 0;
    if (key && _.contains(this.keys, key)) {
      itemObj = _.find(this.list, function(item) {
        return key == item.id;
      });
      callback(null, itemObj);
    } else {
      callback(true, 'Your key is invalid or not exist!');
    }
  };

  Store.prototype.remove = function(key, callback) {
    key = +key || 0;
    if (key && _.contains(this.keys, key)) {
      _.remove(this.keys, function(k) {
        return key == k;
      });
      _.remove(this.list, function(item) {
        return key == item.id;
      });       
      this.counter--;
      this._sync();
      callback();
    } else {
      callback(true, 'Your key is invalid or not exist!');
    }
  };

  var cache = {};
  function _getStore(name) {
    if (name) {
      var store = cache[name];
      if (!store) {
        store = new Store(name);
        cache[name] = store;
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