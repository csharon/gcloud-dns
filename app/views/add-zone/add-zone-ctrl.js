(function () {

  /**
   * @ngdoc function
   * @name xd.views.AddZone:addZoneCtrl
   *
   */
  angular.module('xd.views.AddZone', ['xd.services.ZoneModel', 'ui.bootstrap'])
    .controller('addZoneCtrl', AddZoneCtrl);

  /* @ngInject */
  function AddZoneCtrl($modalInstance) {
    var vm = this;
    vm.name = 'Add a New Zone';

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

})();
