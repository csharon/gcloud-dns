(function () {

  /**
   * @ngdoc directive
   * @name xd.components.RecordForm:recordForm
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.RecordForm', ['xd.tmpls'])
    .directive('recordForm', RecordForm)
    .controller('recordFormCtrl', RecordFormCtrl);

  /* @ngInject */
  function RecordForm() {
    return {
      restrict: 'E',
      controller: 'recordFormCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/components/record-form/record-form.html'
    };
  }

  /* @ngInject */
  function RecordFormCtrl($scope, changeSetModel) {
    var vm = this;
    vm.record = angular.copy(changeSetModel.currentRecord);
    if (!changeSetModel.currentRecordIsNew) {
      vm.rrdata = vm.record.rrdatas[0];
    } else {
      vm.rrdata = '';
    }

    vm.save = save;
    vm.cancel = cancel;

    function save() {
      vm.record.rrdatas = [vm.rrdata];
      $scope.$emit('SAVE_RECORD', vm.record);
    }

    function cancel() {
      $scope.$emit('CANCEL_EDIT_RECORD');
    }

  }

})();
