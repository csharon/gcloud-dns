(function () {

  /**
   * @ngdoc service
   * @name xd.services.ConfirmModal:confirmModal
   *
   */
  angular.module('xd.services.ConfirmModal', ['ngMaterial'])
    .factory('confirmModal', ConfirmModal)
    .factory('confirmationModel', ConfirmationModel)
    .controller('confirmModalCtrl', ConfirmModalCtrl);

  /* @ngInject */
  function ConfirmationModel() {
    var api = {};
    api.title = '';
    api.message = '';

    return api;
  }

  /* @ngInject */
  function ConfirmModal($mdDialog, confirmationModel) {

    //Public API
    var api = {};

    //Properties
    api.open = open;
    api.close = close;


    function open(opts) {
      confirmationModel.title = opts.title;
      confirmationModel.message = opts.message;
      return $mdDialog.show({
        templateUrl: '/services/confirm-modal/confirm-modal.html',
        controller: 'confirmModalCtrl',
        controllerAs: 'vm',
        hasBackdrop: true
      });
    }

    function close() {
      $mdDialog.hide();
    }

    return api;

  }

  /* @ngInject */
  function ConfirmModalCtrl($scope, confirmationModel, $mdDialog) {
    var vm = this;
    vm.model = confirmationModel;

    vm.confirm = confirm;
    vm.cancel = cancel;

    function confirm () {
      $mdDialog.hide();
    }
    function cancel () {
      $mdDialog.cancel();
    }
  }

})();
