/*globals inject, beforeEach, describe, it, expect, module*/
describe('xd.components.RecordForm', function () {

  var el, scope;

  beforeEach( module('xd.components.RecordForm'));

  beforeEach( inject( function ($rootScope, $compile){
    scope = $rootScope.$new();
    el = angular.element('<record-form></record-form>');
    $compile(el, scope);
    scope.$apply();
  }));


  it('should replace with div tag', function () {
    expect(el.prop('tagName')).to.equal('DIV');
  });

});