/*globals angular*/
(function () {
  'use strict';
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
    'xd.services.ChangeSetModel',
    'xd.api.GoogleOauth',
    'xd.wrappers.moment',
    'xd.services.XdToastr',
    'xd.components.ChangeSetViewer',
    'xd.components.RecordForm'
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
      .state('dns.detail.form', {
        templateUrl: '/views/dns-manager/templates/records/form.html'
      })
      .state('dns.detail.edit', {
        templateUrl: '/views/dns-manager/templates/records/edit.html'
      });

  }

  /* @ngInject */
  function DnsManagerCtrl($scope, $log, $state, zoneModel, googleOAuth, xdToastr, $mdSidenav, changeSetModel) {
    var dm = this;
    dm.name = 'DNS Manager';
    dm.zoneModel = zoneModel;
    dm.changeSetModel = changeSetModel;
    dm.createZone = createZone;
    dm.openZoneList = openZoneList;
    dm.closeZoneList = closeZoneList;

    $scope.$on('CREATE_ZONE', createZone);
    $scope.$on('EDIT_ZONE', editZone);
    $scope.$on('CANCEL_CREATE_ZONE', cancelCreateZone);

    $scope.$on('SAVE_ZONE', saveZone);
    $scope.$on('SELECT_ZONE', selectZone);
    $scope.$on('DELETE_ZONE', deleteZone);
    $scope.$on('EDIT_RECORD', editRecord);
    $scope.$on('ADD_RECORD', addRecord);
    $scope.$on('SAVE_RECORD', saveRecord);
    $scope.$on('CANCEL_EDIT_RECORD', cancelEditRecord);
    $scope.$on('SAVE_CHANGE_SET', saveChangeSet);

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

    function createZone() {
      $state.go('dns.new');
    }

    function editZone(event, zone) {
      changeSetModel.createChangeSet(zone);
      $state.go('dns.detail.edit');
    }

    function cancelCreateZone() {
      $state.go('dns.noSelection');
    }

    function saveZone(event, zone) {
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
    }

    function selectZone(event, zone) {
      zoneModel.selectZone(zone).then(
        function () {
          closeZoneList();
          $state.go('dns.detail.view');
        }
      );

    }

    function deleteZone(event, zone) {
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
    }

    function editRecord(event, record) {
      changeSetModel.currentRecordIsNew = false;
      changeSetModel.currentRecord = record;
      $state.go('dns.detail.form');
    }

    function addRecord(event) {
      changeSetModel.currentRecordIsNew = true;
      changeSetModel.currentRecord = {};
      $state.go('dns.detail.form');
    }

    function cancelEditRecord() {
      $state.go('dns.detail.edit');
    }

    function saveRecord(event, record) {
      changeSetModel.saveRecord(record);
      $state.go('dns.detail.edit');
    }

    function saveChangeSet(event, changeSet) {
      zoneModel.saveChanges(changeSet).then(
        function () {
          xdToastr.success ( zoneModel.selectedZone.dnsName + ' updated!' );
          $scope.$broadcast('RESET_CHANGE_SET');
          $state.go('dns.detail.view');
        },
        function (err) {
          $log.error(err);
          xdToastr.error ('Unable to make changes to ' + zoneModel.selectedZone.dnsName + '!' );
        }
      );
    }

    function closeZoneList() {
      $mdSidenav('zone-list').close();
    }

    function openZoneList() {
      $mdSidenav('zone-list').open();
    }

  }

})();
