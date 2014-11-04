(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ChangeSetViewer:changeSetViewer
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ChangeSetViewer', ['xd.tmpls'])
    .controller('changeSetViewerCtrl', ChangeSetViewerCtrl)
    .directive('changeSetViewer', ChangeSetViewer);

  /* @ngInject */
  function ChangeSetViewer() {
    return {
      restrict: 'E',
      controller: 'changeSetViewerCtrl',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        records: '='
      },
      templateUrl: '/components/change-set-viewer/change-set-viewer.html'
    };
  }

  /* @ngInject */
  function ChangeSetViewerCtrl($scope) {
    var vm = this;

    vm.updatedRecordView = angular.copy(vm.records);
    vm.changeSet = {additions: [], deletions: []};
    vm.editRecord = editRecord;

    function editRecord(record) {
      $scope.$emit('EDIT_RECORD', record);
    }

  }



})();
