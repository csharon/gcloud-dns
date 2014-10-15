/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.ZoneViewer', function () {

  var el, scope;

  beforeEach( module('xd.components.ZoneViewer'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<zone-viewer></zone-viewer>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag', function () {
    expect(el.prop('tagName')).to.equal('DIV');
  });

});