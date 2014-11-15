(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneHeader:zoneHeader
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneHeader', ['xd.tmpls'])
    .controller('zoneHeaderCtrl', ZoneHeaderCtrl)
    .directive('zoneHeader', ZoneHeader);

  /* @ngInject */
  function ZoneHeader() {
    return {
      restrict: 'E',
      scope: {
        zone: '=',
        editMode: '='
      },
      bindToController: true,
      controller: 'zoneHeaderCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/zone-header/zone-header.html'
    };
  }

  /* @ngInject */
  function ZoneHeaderCtrl($scope) {
    var vm = this;

    vm.editZone = editZone;
    vm.deleteZone = deleteZone;

    function editZone() {
      $scope.$emit('EDIT_ZONE', vm.zone);
    }

    function deleteZone() {
      $scope.$emit('DELETE_ZONE', vm.zone);
    }

  }

})();
