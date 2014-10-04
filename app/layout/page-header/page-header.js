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
  function HeaderCtrl($scope, $log, googleOAuth) {
    var vm = this;

    vm.authenticated = false;

    vm.login = function () {
      googleOAuth.login();
    };

    vm.logout = function () {
      googleOAuth.logout();
    };

    $scope.$watch(
      function () {
        return googleOAuth.isAuthenticated();
      },
      function (authenticated) {
        vm.authenticated = authenticated;
      }
    );

  }

})();