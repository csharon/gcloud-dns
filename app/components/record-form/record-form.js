(function () {

  /**
   * @ngdoc directive
   * @name xd.components.RecordForm:recordForm
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.RecordForm', ['ngMessages', 'xd.tmpls', 'xd.services.ResourceRecordType'])
    .directive('recordForm', RecordForm)
    .controller('recordFormCtrl', RecordFormCtrl)
    .directive('recordConflict', recordConflictValidator);

  /* @ngInject */
  function recordConflictValidator() {
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: 'recordFormCtrl',
      controllerAs: 'vm',
      bindToController: true,
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.recordConflict = function () {
          return scope.vm.isRecordConflict();
        };
      }
    };
  }

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
  function RecordFormCtrl($scope, changeSetModel, ResourceRecordType) {
    var vm = this;
    vm.record = angular.copy(changeSetModel.currentRecord);
    vm.recordTypes = _(ResourceRecordType)
      .values()
      .filter(filterRecordTypes)
      .pluck('type')
      .value();

    vm.addRRData = addRRData;
    vm.removeRRData = removeRRData;
    vm.isRecordConflict = isRecordConflict;
    vm.rrdata = '';
    vm.disableAddRRData = true;
    vm.enableSave = false;

    vm.save = save;
    vm.cancel = cancel;

    function addRRData() {

      vm.record.rrdatas.addItem(vm.rrdata);
      vm.rrdata = '';
    }

    function isRecordConflict() {
      return !changeSetModel.zone.records.containsItem({name: $scope.recordForm.name.$viewValue, type: $scope.recordForm.type.$viewValue});
    }

    function removeRRData(index) {
      vm.record.rrdatas.items.splice(index, 1);
    }

    function save(recordForm) {
      if (recordForm.$valid) {
        $scope.$emit('SAVE_RECORD', vm.record);
      }

    }

    function cancel() {
      $scope.$emit('CANCEL_EDIT_RECORD');
    }

    function filterRecordTypes(rType) {
      if (!vm.record.isNew() || rType.allowDuplicates) {
        return true;
      } else {
        return !changeSetModel.zone.records.containsItem({type: rType.type});
      }
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
