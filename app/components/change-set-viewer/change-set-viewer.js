(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ChangeSetViewer:changeSetViewer
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ChangeSetViewer', [
    'xd.tmpls',
    'xd.services.ChangeSetModel',
    'xd.services.ConfirmModal'
  ])
    .controller('changeSetViewerCtrl', ChangeSetViewerCtrl)
    .directive('changeSetViewer', ChangeSetViewer);

  /* @ngInject */
  function ChangeSetViewer() {
    return {
      restrict: 'E',
      controller: 'changeSetViewerCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/change-set-viewer/change-set-viewer.html'
    };
  }

  /* @ngInject */
  function ChangeSetViewerCtrl($scope, changeSetModel, confirmModal) {
    var vm = this;
    vm.changeSetModel = changeSetModel;
    vm.editRecord = editRecord;
    vm.addRecord = addRecord;
    vm.deleteRecord = deleteRecord;
    vm.saveChanges = saveChanges;
    vm.cancelChangeSet = cancelChangeSet;

    function editRecord(record) {
      $scope.$emit('EDIT_RECORD', record);
    }

    function addRecord() {
      $scope.$emit('ADD_RECORD');
    }

    function deleteRecord(record) {
      confirmModal.open({
        title: 'Confirm (' + record.type + ') Record Deletion',
        message: 'Are you sure you want to delete ' + record.name + '?'
      }).then(
        function () {
          changeSetModel.removeRecord(record);
        }
      );
    }

    function saveChanges() {
      confirmModal.open({
        title: 'Save Zone Changes',
        message: 'Are you sure you want to save changes for ' + changeSetModel.zone.dnsName + '?'
      }).then(
        function () {
          $scope.$emit('SAVE_CHANGE_SET', changeSetModel.changeSet);
        }
      );
    }

    function cancelChangeSet () {
      $scope.$emit('CANCEL_CHANGE_SET');
    }

  }

})();
