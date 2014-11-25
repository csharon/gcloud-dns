/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.ZoneHeader', function () {

  var el, scope;

  beforeEach( module('xd.components.ZoneHeader'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<zone-header></zone-header>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag');

});
