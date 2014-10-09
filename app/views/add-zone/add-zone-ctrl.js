(function () {

  /**
   * @ngdoc function
   * @name xd.views.AddZone:addZoneCtrl
   *
   */
  angular.module('xd.views.AddZone', [])
    .controller('addZoneCtrl', AddZoneCtrl);

  /* @ngInject */
  function AddZoneCtrl() {
    var vm = this;
    vm.name = 'AddZoneCtrl';
  }

})();
