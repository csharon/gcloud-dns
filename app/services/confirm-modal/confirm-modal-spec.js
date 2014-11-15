/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ConfirmModal', function () {

  beforeEach( module('xd.services.ConfirmModal'));

  it('should have a data function that returns an array', inject(function (confirmModal) {
    expect(angular.isArray(confirmModal.getData())).to.be.true;
  }));

});