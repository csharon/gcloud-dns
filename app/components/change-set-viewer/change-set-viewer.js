(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ChangeSetViewer:changeSetViewer
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ChangeSetViewer', ['xd.tmpls', 'xd.services.ChangeSetModel'])
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
  function ChangeSetViewerCtrl($scope, changeSetModel) {
    var vm = this;
    vm.changeSetModel = changeSetModel;
    vm.editRecord = editRecord;

    function editRecord(record) {
      $scope.$emit('EDIT_RECORD', record);
    }

  }



})();
