(function () {

  /**
   * @ngdoc function
   * @name xd.views.DnsManager:dnsManagerCtrl
   *
   */
  angular.module('xd.views.DnsManager', ['xd.components.ZoneList', 'xd.components.ZoneViewer', 'xd.services.ZoneModel'])
    .controller('dnsManagerCtrl', DnsManagerCtrl);

  /* @ngInject */
  function DnsManagerCtrl($scope, zoneModel) {
    var dm = this;
    dm.name = 'DnsManagerCtrl';

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
  }

})();
