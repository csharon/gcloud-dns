/*globals inject, beforeEach, describe, it, module*/
describe('xd.components.ZoneList', function () {

  var el, scope;

  beforeEach(module('xd.components.ZoneList'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    el = angular.element('<zone-list></zone-list>');
    $compile(el, scope);
    scope.$apply();
  }));

  it('should replace with div tag');

});
