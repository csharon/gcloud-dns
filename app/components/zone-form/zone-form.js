(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneForm:zoneForm
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneForm', ['xd.tmpls', 'xd.services.ManagedZone'])
    .controller('zoneFormCtrl', ZoneFormCtrl)
    .directive('zoneForm', ZoneForm);

  /* @ngInject */
  function ZoneForm() {
    return {
      restrict: 'E',
      controller: 'zoneFormCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/components/zone-form/zone-form.html'
    };
  }

  /* @ngInject */
  function ZoneFormCtrl($scope, ManagedZone) {
    var vm = this;
    vm.zone = new ManagedZone();
    vm.name = 'Add a New Zone';
    vm.save = save;
    vm.cancel = cancel;

    function save() {

      $scope.$emit('SAVE_ZONE', vm.zone);
    }

    function cancel() {
      $scope.$emit('CANCEL_CREATE_ZONE');
    }

  }



})();
