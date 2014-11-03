(function () {

  /**
   * @ngdoc function
   * @name xd.views.DnsManager:dnsManagerCtrl
   *
   */
  angular.module('xd.views.DnsManager', [
    'ui.router',
    'xd.components.ZoneList',
    'xd.components.ZoneForm',
    'xd.components.ZoneHeader',
    'xd.components.RecordList',
    'xd.services.ZoneModel',
    'xd.api.GoogleOauth',
    'xd.wrappers.moment',
    'xd.services.XdToastr',
    'xd.components.ChangesetEditor',
    'xd.components.ChangeSetViewer'
  ])
    .config(config)
    .controller('dnsManagerCtrl', DnsManagerCtrl);

  /* @ngInject */
  function config ($stateProvider) {
    $stateProvider
      .state('dns', {
        templateUrl: '/views/dns-manager/dns-manager.html',
        controller: 'dnsManagerCtrl',
        controllerAs: 'dm',
        abstract: true
      })
      .state('dns.new', {
        templateUrl: '/views/dns-manager/templates/zones/new.html'
      })
      .state('dns.detail', {
        templateUrl: '/views/dns-manager/templates/zones/detail.html',
        abstract: true
      })
      .state('dns.noSelection', {
        templateUrl: '/views/dns-manager/templates/zones/no-selection.html'
      })
      .state('dns.detail.view', {
        templateUrl: '/views/dns-manager/templates/records/view.html'
      })
      .state('dns.detail.edit', {
        templateUrl: '/views/dns-manager/templates/records/edit.html'
      });

  }

  /* @ngInject */
  function DnsManagerCtrl($scope, $log, $state, zoneModel, googleOAuth, xdToastr) {
    var dm = this;
    dm.name = 'DNS Manager';

    dm.zoneModel = zoneModel;
    dm.createZone = createZone;

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

    $scope.$on('CREATE_ZONE', createZone);
    $scope.$on('EDIT_ZONE', editZone);

    $scope.$on('CANCEL_CREATE_ZONE', function (event) {
      $state.go('dns.noSelection');
    });

    $scope.$on('SAVE_ZONE', function (event, zone) {
      zoneModel.createZone(zone).then(
        function (resp) {
          xdToastr.success(resp.dnsName + ' created!');
          $state.go('dns.detail.view');
        },
        function (err) {
          $log.error(err);
          xdToastr.error('Unable to create ' + zone.dnsName + '!');
        }
      );
    });

    $scope.$on('SELECT_ZONE', function (event, zone) {
      zoneModel.selectZone(zone).then(
        function () {
          $state.go('dns.detail.view');
        }
      );

    });

    $scope.$on('DELETE_ZONE', function (event, zone) {
      zoneModel.deleteZone(zone).then(
        function (resp) {
          xdToastr.success ( resp.dnsName + ' deleted!' );
          $state.go('dns.noSelection');
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

    function createZone() {
      $state.go('dns.new');
    }

    function editZone() {
      $state.go('dns.detail.edit');
    }
  }

})();
