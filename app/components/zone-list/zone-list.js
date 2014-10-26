(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneList:zoneList
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneList', ['xd.tmpls'])
    .controller('zoneListCtrl', ZoneListCtrl)
    .directive('zoneList', ZoneList);

  /* @ngInject */
  function ZoneList() {
    return {
      restrict: 'E',
      scope: {
        zones: '=',
        selectedZone: '='
      },
      bindToController: true,
      controller: 'zoneListCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/zone-list/zone-list.html'
    };
  }

  /* @ngInject */
  function ZoneListCtrl($scope) {
    var vm = this;

    vm.createZone = createZone;
    vm.selectZone = selectZone;
    vm.deleteZone = deleteZone;

    function createZone() {
      $scope.$emit('CREATE_ZONE');
    }

    function deleteZone(zone) {
      $scope.$emit('DELETE_ZONE', zone);
    }

    function selectZone(zone) {
      $scope.$emit('SELECT_ZONE', zone);
    }

  }

})();
