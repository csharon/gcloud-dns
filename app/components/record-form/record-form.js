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
    vm.addRRData = addRRData;
    vm.removeRRData = removeRRData;
    vm.rrdata = '';
    vm.disableAddRRData = true;
    vm.enableSave = false;

    vm.save = save;
    vm.cancel = cancel;

    function addRRData() {
      if (!angular.isArray(vm.record.rrdatas)) {
        vm.record.rrdatas = [];
      }
      vm.record.rrdatas.push(vm.rrdata);
      vm.rrdata = '';
    }

    function removeRRData(index) {
      vm.record.rrdatas.splice(index, 1);
    }

    function save() {
      //vm.record.rrdatas = [vm.rrdata];
      $scope.$emit('SAVE_RECORD', vm.record);
    }

    function cancel() {
      $scope.$emit('CANCEL_EDIT_RECORD');
    }

    $scope.$watch(
      function () {
        return vm.rrdata;
      },
      function (val) {
        vm.disableAddRRData = _.isEmpty(val);
      }
    );

  }

})();
