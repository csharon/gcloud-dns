/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.views.AddZone', function () {

  beforeEach( module('xd.views.AddZone'));
  var scope, ctrl;
  beforeEach( inject( function ($rootScope, $controller){
    scope = $rootScope.$new();
    ctrl = $controller('addZoneCtrl as vm', { $scope: scope });
  }));


  it('should have scope', function () {
    expect(scope.vm.name).to.equal('AddZoneCtrl');
  });

});