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
    'xd.wrappers.moment',
    'xd.services.XdToastr'
  ])
    .controller('dnsManagerCtrl', DnsManagerCtrl);

  /* @ngInject */
  function DnsManagerCtrl($scope, zoneModel, googleOAuth, $modal, xdToastr) {
    var dm = this;
    dm.name = 'DNS Manager';

    dm.zoneModel = zoneModel;

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

    $scope.$on('DELETE_ZONE', function (event, zone) {
      zoneModel.deleteZone(zone).then(
        function (resp) {
          xdToastr.success ( resp.dnsName + ' deleted!' );
        },
        function (err) {
          xdToastr.error ('Unable to delete ' + zoneModel.selectedZone.dnsName + '!' );
        }
      );
    });
  }

})();
