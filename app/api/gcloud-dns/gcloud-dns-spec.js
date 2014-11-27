/*globals inject, beforeEach, describe, it, module*/
/*jshint expr: true*/
describe('xd.api.GcloudDns', function () {

  var $httpBackend, GcloudDnsMockData, resourceURL;

  beforeEach( module('xd.api.GcloudDnsMockData'));
  beforeEach( module('xd.api.GcloudDns'));

  beforeEach(inject(function (_$httpBackend_, _GcloudDnsMockData_, GcloudDnsConfig) {
    $httpBackend = _$httpBackend_;
    GcloudDnsMockData = _GcloudDnsMockData_;
    resourceURL = GcloudDnsConfig.BASE_URL + '/' + GcloudDnsConfig.RESOURCE_NAME;
  }));

  it('should have a getAll function that makes a GET request to https://www.googleapis.com/dns/v1beta1/projects and returns an array');

});
