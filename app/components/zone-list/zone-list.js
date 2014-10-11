(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneList:zoneList
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneList', ['xd.tmpls', 'xd.services.ZoneModel', 'xd.api.GoogleOauth'])
    .controller('zoneListCtrl', ZoneListCtrl)
    .directive('zoneList', ZoneList);

  /* @ngInject */
  function ZoneList() {
    return {
      restrict: 'E',
      replace: true,
      controller: 'zoneListCtrl',
      controllerAs: 'vm',
      templateUrl: '/components/zone-list/zone-list.html'
    };
  }

  /* @ngInject */
  function ZoneListCtrl($scope, zoneModel, googleOAuth) {
    var vm = this;
    vm.zoneList = [];


    $scope.$watch(
      function () {
        return zoneModel.zoneList();
      },
      function (zones) {
        vm.zoneList = zones;
      }
    );

    $scope.$watch(
      function () {
        return googleOAuth.isAuthenticated();
      },
      function (authenticated) {
        if (authenticated) {
          zoneModel.refreshZones();
        }
      }
    );


  }

})();