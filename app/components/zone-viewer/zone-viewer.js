(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneViewer:zoneViewer
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneViewer', ['xd.tmpls'])
    .directive('zoneViewer', ZoneViewer);

  /* @ngInject */
  function ZoneViewer() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        zone: '='
      },
      templateUrl: '/components/zone-viewer/zone-viewer.html'
    };
  }

})();