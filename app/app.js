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
  function GcloudDnsCtrl ($state, googleOAuth, gcloudDns) {
    var vm = this;
    vm.appTitle = 'Gcloud Dns';

    googleOAuth.loadProfile().then(loginSuccess, loginFailed);

    function loginSuccess(resp) {
      gcloudDns.setToken(resp.token);
      $state.go('dns.noProject');
    }

    function loginFailed() {
      $state.go('welcome');
    }

  }


})();
