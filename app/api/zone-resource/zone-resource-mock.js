(function () {
  angular.module('xd.api.ZoneResourceMock', ['ngMockE2E', 'xd.api.ZoneResourceMockData', 'xd.api.ZoneResource'])
    .run(ZoneResourceMock);
    
  function ZoneResourceMock($httpBackend, ZoneResourceMockData, ZoneResourceConfig) {
    var URL = ZoneResourceConfig.BASE_URL + '/' + ZoneResourceConfig.RESOURCE_NAME;

    $httpBackend.whenGET(URL).respond(ZoneResourceMockData);

    $httpBackend.whenPOST(URL).respond(function (method, url, data) {
      var item = angular.fromJson(data);
      ZoneResourceMockData.push(item);
      return [200, item, {}];
    });
  }

})();