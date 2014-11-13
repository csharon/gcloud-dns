(function () {

  angular.module('xd.layout.PageHeader', ['xd.api.GoogleOauth', 'ngMaterial'])
    .controller('headerCtrl', HeaderCtrl)
    .directive('xdPageHeader', XdPageHeader);

  /* @ngInject */
  function XdPageHeader() {
    return {
      restrict: 'EA',
      controller: 'headerCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/layout/page-header/page-header.html'
    };
  }

  /* @ngInject */
  function HeaderCtrl($scope, googleOAuth, $mdSidenav) {
    var vm = this;

    vm.authenticated = false;
    vm.profile = {};
    vm.login = googleOAuth.login;
    vm.logout = googleOAuth.logout;
    vm.openZoneList = openZoneList;

    $scope.$watch(
      function () {
        return googleOAuth.isAuthenticated();
      },
      function (authenticated) {
        vm.authenticated = authenticated;
        if (authenticated) {
          vm.profile = googleOAuth.profile();

        } else {
          vm.profile = {};

        }
      }
    );

    function openZoneList() {
      $mdSidenav('zone-list').open();
    }

  }

})();
