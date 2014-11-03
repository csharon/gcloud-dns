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
  function ChangeSetViewerCtrl() {
    var vm = this;

    vm.updatedRecordView = angular.copy(vm.records);
    vm.changeSet = {additions: [], deletions: []};

    var originalSOA = _.find(vm.records, {type: 'SOA'});

    var soaVal = getSOAValues(originalSOA.rrdatas[0]);
    vm.changeSet.deletions.push(originalSOA);
    var newSOA = angular.copy(originalSOA);
    var newSOAVal = angular.copy(soaVal);
    newSOAVal.serial = newSOAVal.serial + 1;
    newSOA.rrdatas[0] = _.values(newSOAVal).join(' ');
    vm.changeSet.additions.push(newSOA);

  }

  function getSOAValues(rrdataVal) {
    var soaParts = rrdataVal.split(' ');
    return {
      nameServer: soaParts[0],
      email: soaParts[1],
      serial: parseInt(soaParts[2], 10),
      refreshRate: parseInt(soaParts[3], 10),
      updateRetry: parseInt(soaParts[4], 10),
      expiry: parseInt(soaParts[5], 10),
      minCache: parseInt(soaParts[6], 10)
    };
  }

  function updateSerial() {

  }

})();
