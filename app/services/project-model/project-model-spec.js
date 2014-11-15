/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ProjectModel', function () {

  beforeEach( module('xd.services.ProjectModel'));

  it('should have a data function that returns an array', inject(function (projectModel) {
    expect(angular.isArray(projectModel.getData())).to.be.true;
  }));

});