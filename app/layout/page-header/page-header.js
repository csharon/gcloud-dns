(function () {

  angular.module('xd.layout.PageHeader', ['xd.api.GoogleOauth'])
    .controller('headerCtrl', HeaderCtrl)
    .directive('xdPageHeader', XdPageHeader);

  /* @ngInject */
  function XdPageHeader() {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'headerCtrl',
      controllerAs: 'vm',
      templateUrl: '/layout/page-header/page-header.html'
    };
  }

  /* @ngInject */
  function HeaderCtrl($scope, googleOAuth) {
    var vm = this;

    vm.authenticated = false;
    vm.profile = {};
    vm.login = googleOAuth.login;
    vm.logout = googleOAuth.logout;

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

  }

})();