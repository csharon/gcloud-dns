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

    // Public API
    var model = {
      zoneList: [],
      selectedZone: {},
      refreshZones: refreshZoneList,
      createZone: createZone,
      selectZone: selectZone,
      deleteZone: deleteZone
    };

    function refreshZoneList() {
      zoneResource.getAll().then(
        function (resp) {
          model.zoneList = resp;
          return resp;
        },
        function (err) {
          $log.error(err);
        }
      );
    }

    function selectZone(zone) {
      model.selectedZone = zone;
    }

    function createZone(zone) {
      return zoneResource.create(zone).then(
        function (resp) {
          model.selectedZone = resp;
          model.zoneList.push(resp);
          return resp;
        },
        function (err) {
          return $q.reject(err);
        }
      );

    }

    function deleteZone(zone) {
      return zoneResource.remove(zone).then(
        function (resp) {
          var tempZone =_(model.zoneList)
            .remove(function (zone) {
              return zone.id === model.selectedZone.id;
            })
            .first();
          model.selectedZone = {};
          return tempZone;
        },
        function (err) {
          return $q.reject(err);
        }
      );

    }

    return model;
  }

})();
