(function () {

  /**
   * @ngdoc function
   * @name xd.views.AddZone:addZoneCtrl
   *
   */
  angular.module('xd.views.AddZone', ['xd.services.ZoneModel', 'xd.components.ZoneForm', 'ui.bootstrap', 'xd.services.XdToastr'])
    .controller('addZoneCtrl', AddZoneCtrl);

  /* @ngInject */
  function AddZoneCtrl($modalInstance, xdToastr, zoneModel) {
    var vm = this;
    vm.zone = {};
    vm.name = 'Add a New Zone';

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    vm.createZone = function () {
      zoneModel.createZone(vm.zone).then(
        function () {
          $modalInstance.close();
          xdToastr.success ( vm.zone.name + ' created!' );
        },
        function () {
          xdToastr.error ( vm.zone.name + ' no created!' );
        }
      );
    };

  }

})();
