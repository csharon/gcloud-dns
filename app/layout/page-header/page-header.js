(function () {

  angular.module('xd.layout.PageHeader', ['xd.api.GoogleOauth', 'ngMaterial'])
    .controller('headerCtrl', HeaderCtrl)
    .directive('xdPageHeader', XdPageHeader);

  /* @ngInject */
  function XdPageHeader() {
    return {
      restrict: 'E',
      scope: {
        appTitle: '='
      },
      controller: 'headerCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/layout/page-header/page-header.html'
    };
  }

  /* @ngInject */
  function HeaderCtrl(googleOAuth, $mdSidenav) {
    var vm = this;
    vm.auth = googleOAuth;
    vm.openZoneList = openZoneList;

    function openZoneList() {
      $mdSidenav('zone-list').open();
    }

  }

})();
