(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneHeader:zoneHeader
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneHeader', ['xd.tmpls', 'xd.services.ConfirmModal'])
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
  function ZoneHeaderCtrl($scope, confirmModal) {
    var vm = this;

    vm.editZone = editZone;
    vm.deleteZone = deleteZone;

    function editZone() {
      $scope.$emit('EDIT_ZONE', vm.zone);
    }

    function deleteZone(e) {
      confirmModal.open({
        event: e,
        title: 'Confirm Zone Deletion',
        message: 'Are you sure you want to delete ' + vm.zone.dnsName + '?'
      }).then(
        function () {
          $scope.$emit('DELETE_ZONE', vm.zone);

        }
      );

    }

  }

})();
