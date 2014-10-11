(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneForm:zoneForm
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneForm', ['xd.tmpls'])
    .directive('zoneForm', ZoneForm);

  /* @ngInject */
  function ZoneForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/components/zone-form/zone-form.html'
    };
  }

})();