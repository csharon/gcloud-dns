(function () {

  /**
   * @ngdoc function
   * @name xd.views.DnsManager:dnsManagerCtrl
   *
   */
  angular.module('xd.views.DnsManager', [
    'xd.components.ZoneList', 'xd.components.ZoneViewer',
    'xd.services.ZoneModel',
    'xd.views.AddZone',
    'xd.api.GoogleOauth',
    'ui.bootstrap',
    'xd.wrappers.moment'
  ])
    .controller('dnsManagerCtrl', DnsManagerCtrl);

  /* @ngInject */
  function DnsManagerCtrl($scope, zoneModel, googleOAuth, $modal) {
    var dm = this;
    dm.name = 'DNS Manager';

    dm.zoneList = [];
    dm.selectedZone = {
      name: '',
      dnsName: '',
      description: ''
    };

    $scope.$watch(
      function () {
        return zoneModel.selectedZone();
      },
      function (zone) {
        dm.selectedZone = zone;
      }
    );

    $scope.$watch(
      function () {
        return zoneModel.zoneList();
      },
      function (zones) {
        dm.zoneList = zones;
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

    $scope.$on('CREATE_ZONE', function () {
      $modal.open({
        templateUrl: '/views/add-zone/add-zone.html',
        controller: 'addZoneCtrl as vm',
        size: 'lg'
      });
    });

    $scope.$on('SELECT_ZONE', function (event, zone) {
      zoneModel.selectZone(zone);
    });
  }

})();
