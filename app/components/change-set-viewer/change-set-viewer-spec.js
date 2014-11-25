/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.ChangeSetViewer', function () {

  var el, scope;

  beforeEach( module('xd.components.ChangeSetViewer'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<change-set-viewer></change-set-viewer>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag');

});
