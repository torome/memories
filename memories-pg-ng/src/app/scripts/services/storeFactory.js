'use strict';

angular.module('memoriesApp')
.factory('storeFactory', function storeFactory() {

  function Store(name) {
    this.name = name;
    var data = window.localStorage.getItem(this.name) || '[]';
    this.list = angular.fromJson(data);
    this.index = this.list.length;
    this.keys = _.map(this.list, function(item) {
      return item.id;
    });
    this.cleanup = null;
  }

  Store.prototype._sync = function() {
    var value = angular.toJson(this.list);
    window.localStorage.setItem(this.name, value);
  };

  Store.prototype.add = function(data, callback) {
    if (angular.isObject(data)) {
      var key = this.name + this.index;
      this.list.push({'id':key, 'data': data, time: moment().format('YYYY-MM-DD hh:mm:ss')});
      this._sync();
      this.index++;
      callback();
    } else {
      callback(true, 'Your data must be a object.');
    }
  };

  Store.prototype.getList = function(callback) {
    callback(null, this.list);
  };

  Store.prototype.remove = function(key, callback) {
    if (key && _.contains(this.keys, key)) {
      this.keys = _.remove(this.keys, function(k) {
        return key == k;
      });
      this.list = _.remove(this.list, function(item) {
        return key == item.id;
      });       
      this._sync();
      this.index--;
      callback();
    } else {
      callback(true, 'Your key is not valid or not exist!');
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