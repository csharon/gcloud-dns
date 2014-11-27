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
        zones: '='
      },
      bindToController: true,
      controller: 'zoneListCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/zone-list/zone-list.html'
    };
  }

  /* @ngInject */
  function ZoneListCtrl($scope, zoneModel) {
    var vm = this;

    vm.createZone = createZone;
    vm.selectZone = selectZone;
    vm.zoneModel = zoneModel;

    function createZone() {
      $scope.$emit('CREATE_ZONE');
    }

    function selectZone(zone) {
      $scope.$emit('SELECT_ZONE', zone);
    }

  }

})();
