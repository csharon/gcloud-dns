(function () {
  var ZoneResourceConfig = {
    RESOURCE_NAME: 'managedZones'
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


    //Public API
    return {
      getAll: function () {
        return gcloudDns.getProject().getList(ZoneResourceConfig.RESOURCE_NAME);
      }

    };
  }

})();