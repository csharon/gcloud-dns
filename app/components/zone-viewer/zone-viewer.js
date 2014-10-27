(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneViewer:zoneViewer
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneViewer', ['xd.tmpls', 'xd.components.RecordList'])
    .controller('zoneViewerCtrl', ZoneViewerCtrl)
    .directive('zoneViewer', ZoneViewer);

  /* @ngInject */
  function ZoneViewer() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        zone: '='
      },
      bindToController: true,
      controller: 'zoneViewerCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/zone-viewer/zone-viewer.html'
    };
  }

  /* @ngInject */
  function ZoneViewerCtrl($scope) {
    var vm = this;

    vm.deleteZone = deleteZone;

    function deleteZone() {
      $scope.$emit('DELETE_ZONE', vm.zone);
    }

  }


})();
