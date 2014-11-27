/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ResourceRecordType', function () {

  beforeEach( module('xd.services.ResourceRecordType'));

  it('should have a data function that returns an array', inject(function (resourceRecordType) {
    expect(angular.isArray(resourceRecordType.getData())).to.be.true;
  }));

});