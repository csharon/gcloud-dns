(function () {

  /**
   * @ngdoc service
   * @name xd.services.ZoneModel:zoneModel
   *
   */
  angular.module('xd.services.ZoneModel', ['xd.api.ZoneResource'])
    .factory('zoneModel', ZoneModel);

  /* @ngInject */
  function ZoneModel($log, zoneResource) {
    var _zoneList = [];
    function refreshZoneList() {
      zoneResource.getAll().then(
        function (resp) {
          _zoneList = resp;
          return resp;
        },
        function (err) {
          $log.error(err);
        }
      );
    }

    //Public API
    return {
      zoneList: function () {
        return _zoneList;
      },
      refreshZones: refreshZoneList
    };
  }

})();