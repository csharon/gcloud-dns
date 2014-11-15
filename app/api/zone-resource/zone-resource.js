(function () {
  var ZoneResourceConfig = {
    RESOURCE_NAME: 'managedZones',
    RESOURCE_RECORD_SET: 'rrsets',
    CHANGE_SET: 'changes'
  };

  /**
  * @ngdoc service
  * @name xd.api.ZoneResource:zoneResource
  *
  */
  angular.module('xd.api.ZoneResource', ['restangular', 'xd.api.GcloudDns'])
    .constant('ZoneResourceConfig', ZoneResourceConfig)
    .factory('zoneResource', ZoneResource);

  /* @ngInject */
  function ZoneResource($q, gcloudDns) {
    var zones;


    function getUpdatedProject() {
      var deferred = $q.defer();
      var promise = deferred.promise;
      gcloudDns.getProject().then(
        function (project) {
          zones = project.all(ZoneResourceConfig.RESOURCE_NAME);
          deferred.resolve(project);
        },
        function (err) {
          deferred.reject(err);
        }
      );
      return promise;
    }
    //Public API
    return {
      getAll: function () {
        var deferred = $q.defer();
        var promise = deferred.promise;

        getUpdatedProject().then(
          function () {
            zones.getList().then(
              function (zoneList) {
                deferred.resolve(zoneList);
              }
            );
          }
        );
        return promise;
      },
      create: function(zone) {
        return zones.post(zone);
      },
      remove: function(zone) {
        return zone.remove();
      },
      getRecords: function (zone) {
        return zone.getList(ZoneResourceConfig.RESOURCE_RECORD_SET);
      },
      createChangeSet: function (zone, changeSet) {
        return zone.all(ZoneResourceConfig.CHANGE_SET).post(changeSet);
      }

    };
  }

})();
