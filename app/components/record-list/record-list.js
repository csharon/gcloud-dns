(function () {

  /**
   * @ngdoc directive
   * @name xd.components.RecordList:recordList
   * @restrict EA
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.RecordList', ['xd.tmpls'])
    .controller('recordListCtrl', RecordListCtrl)
    .directive('recordList', RecordList);

  /* @ngInject */
  function RecordList() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        records: '='
      },
      bindToController: true,
      controller: 'recordListCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/record-list/record-list.html'
    };
  }

  /* @ngInject */
  function RecordListCtrl() {

  }

})();
