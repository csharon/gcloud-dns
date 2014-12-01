/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ResourceRecordType', function () {

  beforeEach( module('xd.services.ResourceRecordType'));

  it('should return a json object with record types', inject(function (ResourceRecordType) {
    expect(ResourceRecordType.A.type ).to.equal('A');
  }));

});
