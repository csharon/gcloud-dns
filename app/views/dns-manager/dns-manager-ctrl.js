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
    'xd.services.XdToastr',
    'xd.components.ChangesetEditor'
  ])
    .controller('dnsManagerCtrl', DnsManagerCtrl);

  /* @ngInject */
  function DnsManagerCtrl($scope, $log, zoneModel, googleOAuth, $modal, xdToastr) {
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
          $log.error(err);
          xdToastr.error ('Unable to delete ' + zoneModel.selectedZone.dnsName + '!' );
        }
      );
    });

    $scope.$on('SAVE_CHANGE_SET', function (event, changeSet) {
      zoneModel.saveChanges(changeSet).then(
        function () {
          xdToastr.success ( zoneModel.selectedZone.dnsName + ' updated!' );
          $scope.$broadcast('RESET_CHANGE_SET');
        },
        function (err) {
          $log.error(err);
          xdToastr.error ('Unable to make changes to ' + zoneModel.selectedZone.dnsName + '!' );
        }
      );
    });
  }

})();
