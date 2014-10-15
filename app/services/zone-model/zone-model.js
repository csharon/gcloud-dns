(function () {

  /**
   * @ngdoc service
   * @name xd.services.ZoneModel:zoneModel
   *
   */
  angular.module('xd.services.ZoneModel', ['xd.api.ZoneResource'])
    .factory('zoneModel', ZoneModel);

  /* @ngInject */
  function ZoneModel($log, $q, zoneResource) {
    var _zoneList = [];
    var _selectedZone = {};

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

    function createZone(zone) {
      return zoneResource.create(zone).then(
        function (resp) {
          _selectedZone = resp;
          _zoneList.push(resp);
          return resp;
        },
        function (err) {
          return $q.reject(err);
        }
      );

    }

    function selectZone(zone) {
      _selectedZone = zone;
    }

    //Public API
    return {
      zoneList: function () {
        return _zoneList;
      },
      selectedZone: function () {
        return _selectedZone;
      },
      selectZone: selectZone,
      refreshZones: refreshZoneList,
      createZone: createZone
    };
  }

})();