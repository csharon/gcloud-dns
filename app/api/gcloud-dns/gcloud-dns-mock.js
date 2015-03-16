(function () {
  'use strict';

  angular.module('xd.api.GcloudDnsMock', [
    'ngMockE2E',
    'xd.api.GcloudDnsMockData',
    'xd.api.GcloudDns'
  ]).run(GcloudDnsMock);

  function GcloudDnsMock($httpBackend, GcloudDnsMockData, GcloudDnsConfig) {
    var URL = GcloudDnsConfig.BASE_URL + '/' + GcloudDnsConfig.RESOURCE_NAME;

    $httpBackend.whenGET(URL).respond(GcloudDnsMockData);

    $httpBackend.whenPOST(URL).respond(function (method, url, data) {
      var item = angular.fromJson(data);
      GcloudDnsMockData.push(item);
      return [200, item, {}];
    });
  }

})();
