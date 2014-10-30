/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.ChangesetEditor', function () {

  var el, scope;

  beforeEach( module('xd.components.ChangesetEditor'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<changeset-editor></changeset-editor>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag', function () {
    expect(el.prop('tagName')).to.equal('DIV');
  });

});