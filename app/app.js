(function () {

  angular.module('GcloudDns', [
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'xd.layout.PageHeader',
    'xd.tmpls',
    'xd.views.Welcome',
    'xd.views.DnsManager',
    'xd.components.ZoneList',
    'xd.api.GcloudDns',
    'xd.api.ZoneResource',
    'xd.services.XdToastr'
  ])
    .config(config)
    .controller('gcloudDnsCtrl', GcloudDnsCtrl);

  /* @ngInject */
  function config ($httpProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $stateProvider
      .state('welcome', { templateUrl: '/views/welcome/welcome.html', controller: 'welcomeCtrl', controllerAs: 'vm'});

  }

  /* @ngInject */
  function GcloudDnsCtrl ($scope, $state, googleOAuth, gcloudDns) {
    var vm = this;
    vm.appTitle = 'Gcloud Dns';
    $state.go('welcome');
    $scope.$watch(
      function () {
        return googleOAuth.isAuthenticated();
      },
      function (authenticated) {
        if (authenticated) {
          gcloudDns.setToken(googleOAuth.token());
          gcloudDns.setProject('xdoji-dns');
          $state.go('dns.noSelection');
        } else {
          $state.go('welcome');
        }
      }
    );
  }


})();
