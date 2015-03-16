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
      deleteZone: deleteZone,
      saveChanges: saveChanges,
      loadingZones: false
    };

    function refreshZoneList() {
      model.loadingZones = true;
      return zoneResource.getAll().then(
        function (resp) {
          model.zoneList = resp;
          return resp;
        },
        function (err) {
          return $q.reject(err);
        }
      )['finally'](function () {
        model.loadingZones = false;
      });
    }

    function selectZone(zone) {
      model.selectedZone = zone;
      return getRecords(zone);
    }

    function createZone(zone) {
      return zoneResource.create(zone).then(
        function (resp) {
          model.selectedZone = resp;
          model.zoneList.push(resp);
          getRecords(resp);
          return resp;
        },
        function (err) {
          return $q.reject(err);
        }
      );

    }

    function deleteZone(zone) {
      return zoneResource.remove(zone).then(
        function () {
          var tempZone = _(model.zoneList)
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

    function getRecords(zone) {
      return zoneResource.getRecords(zone).then(
        function (resp) {
          model.selectedZone.records.items = resp;
        },
        function (err) {
          return $q.reject(err);
        }
      );
    }

    function saveChanges(changeSet) {
      return zoneResource.createChangeSet(model.selectedZone, changeSet).then(
        function (resp) {
          getRecords(model.selectedZone);
          return resp;
        },
        function (err) {
          return $q.reject(err);
        }
      );
    }

    return model;
  }

})();
