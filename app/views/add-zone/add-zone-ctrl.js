(function () {

  /**
   * @ngdoc function
   * @name xd.views.AddZone:addZoneCtrl
   *
   */
  angular.module('xd.views.AddZone', ['ui.bootstrap'])
    .controller('addZoneCtrl', AddZoneCtrl);

  /* @ngInject */
  function AddZoneCtrl($modalInstance) {
    var vm = this;
    vm.name = 'AddZoneCtrl';

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

})();
