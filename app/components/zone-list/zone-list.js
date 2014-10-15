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
      replace: true,
      scope: {
        zones: '=',
        selectedZone: '='
      },
      controller: 'zoneListCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/zone-list/zone-list.html'
    };
  }

  /* @ngInject */
  function ZoneListCtrl($scope) {
    var vm = this;

    vm.isActive = function (zone, selectedZone) {
      return selectedZone.id === zone.id;
    }
    vm.createZone = function () {
      $scope.$emit('CREATE_ZONE');
    }

    vm.selectZone = function (zone) {
      $scope.$emit('SELECT_ZONE', zone);
    }


  }

})();