/*globals inject, beforeEach, describe, it, module*/
/*jshint expr: true*/
describe('xd.api.ZoneResource', function () {

  var $httpBackend, ZoneResourceMockData, resourceURL;

  beforeEach( module('xd.api.ZoneResourceMockData'));
  beforeEach( module('xd.api.ZoneResource'));

  beforeEach(inject(function (_$httpBackend_, _ZoneResourceMockData_, ZoneResourceConfig) {
    $httpBackend = _$httpBackend_;
    ZoneResourceMockData = _ZoneResourceMockData_;
    resourceURL = ZoneResourceConfig.BASE_URL + '/' + ZoneResourceConfig.RESOURCE_NAME;
  }));

  it('should have a getAll function that makes a GET request to /api/v1/managedZones and returns an array');

});
