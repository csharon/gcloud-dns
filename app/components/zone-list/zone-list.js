(function () {

  /**
   * @ngdoc directive
   * @name xd.components.ZoneList:zoneList
   * @restrict E
   * @element any
   * @function
   * @description
   */
  angular.module('xd.components.ZoneList', ['xd.tmpls', 'xd.services.ZoneModel', 'xd.views.AddZone', 'xd.api.GoogleOauth', 'ui.bootstrap'])
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
  function ZoneListCtrl($scope, $modal, zoneModel, googleOAuth) {
    var vm = this;
    vm.zoneList = [];

    vm.openNew = function () {
      $modal.open({
        templateUrl: '/views/add-zone/add-zone.html',
        controller: 'addZoneCtrl as vm',
        size: 'lg'
      });
    };

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