(function () {
  var ZoneResourceConfig = {
    RESOURCE_NAME: 'managedZones',
    RESOURCE_RECORD_SET: 'rrsets'
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
  function ZoneResource(gcloudDns) {

    var zones = gcloudDns.getProject().all(ZoneResourceConfig.RESOURCE_NAME);
    //Public API
    return {
      getAll: function () {
        return zones.getList();
      },
      create: function(zone) {
        return zones.post(zone);
      },
      remove: function(zone) {
        return zone.remove();
      },
      getRecords: function (zone) {
        return zone.getList(ZoneResourceConfig.RESOURCE_RECORD_SET);
      }

    };
  }

})();
