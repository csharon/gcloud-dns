(function () {

  angular.module('GcloudDns', [
    'ui.router',
    'xd.layout.PageHeader',
    'xd.tmpls',
    'xd.views.Welcome',
    'xd.views.DnsManager'
  ])
    .config(config)
    .controller('gcloudDnsCtrl', GcloudDnsCtrl);

  /* @ngInject */
  function config ($httpProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $stateProvider
      .state('welcome', { templateUrl: '/views/welcome/welcome.html', controller: 'welcomeCtrl', controllerAs: 'vm'})
      .state('dns-manager', { templateUrl: '/views/dns-manager/dns-manager.html', controller: 'dnsManagerCtrl', controllerAs: 'vm'});

  }

  /* @ngInject */
  function GcloudDnsCtrl ($state) {
    var vm = this;
    vm.appTitle = 'Gcloud Dns';
    $state.go('welcome');
  }


})();