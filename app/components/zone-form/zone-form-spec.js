/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.ZoneForm', function () {

  var el, scope;

  beforeEach( module('xd.components.ZoneForm'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<zone-form></zone-form>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag');

});
