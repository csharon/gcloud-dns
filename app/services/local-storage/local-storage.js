(function () {

  /**
   * @ngdoc service
   * @name xd.services.LocalStorage:localStorage
   *
   */
  angular.module('xd.services.LocalStorage', [])
    .factory('localStorage', LocalStorage);

  /* @ngInject */
  function LocalStorage($window, $q) {
    var ls = {};
    ls.save = save;
    ls.getItem = getItem;
    ls.removeItem = removeItem;

    function save(key, data) {
      $window.localStorage[key] = JSON.stringify(data);
    }

    function getItem(key) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var item = $window.localStorage[key];
      if (angular.isDefined(item)) {
        deferred.resolve(JSON.parse(item));
      } else {
        deferred.reject("Key not found");
      }

      return promise;
    }

    function removeItem(key) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var item = JSON.parse($window.localStorage[key]);
      if (angular.isDefined(item)) {
        deferred.resolve($window.localStorage.removeItem(key));
      } else {
        deferred.reject("Key not found");
      }

      return promise;
    }

    return ls;
  }

})();
