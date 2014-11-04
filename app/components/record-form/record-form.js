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
    .directive('recordForm', RecordForm);

  /* @ngInject */
  function RecordForm() {
    return {
      restrict: 'E',
      templateUrl: '/components/record-form/record-form.html'
    };
  }

  /* @ngInject */
  function RecordFormCtrl($scope) {
    var vm = this;
    vm.record = {};
    vm.name = 'Add a New Record';
    vm.save = save;
    vm.cancel = cancel;

    function save() {

      $scope.$emit('SAVE_RECORD', vm.record);
    }

    function cancel() {
      $scope.$emit('CANCEL_EDIT_RECORD');
    }

  }

})();
