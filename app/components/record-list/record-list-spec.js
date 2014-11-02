/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.RecordList', function () {

  var el, scope;

  beforeEach( module('xd.components.RecordList'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<record-list></record-list>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag', function () {
    expect(el.prop('tagName')).to.equal('DIV');
  });

});