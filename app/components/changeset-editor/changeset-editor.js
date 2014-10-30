(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ChangesetEditor:changesetEditor
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ChangesetEditor', ['xd.tmpls'])
    .controller('changeSetCtrl', ChangeSetCtrl)
    .directive('changesetEditor', ChangesetEditor);

  /* @ngInject */
  function ChangesetEditor() {
    return {
      restrict: 'EA',
      scope: {
        zone: '='
      },
      controller: 'changeSetCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/components/changeset-editor/changeset-editor.html'
    };
  }

  function ChangeSetCtrl($scope) {
    var vm = this;

    vm.changeSet = {
      additions: [],
      deletions: []
    };

    vm.deletedRecord = {};
    vm.newRecord = {};
    vm.rrdata = [];

    vm.deleteRecord = function () {
      vm.changeSet.deletions.push(vm.deletedRecord);
      vm.deletedRecord = {};
    };

    vm.addRecord = function () {
      vm.newRecord.rrdatas = [vm.rrdata];
      vm.changeSet.additions.push(vm.newRecord);
      vm.newRecord = {};
    };

    vm.saveChanges = function () {
      $scope.$emit('SAVE_CHANGE_SET', vm.changeSet);
    };


  }

})();
