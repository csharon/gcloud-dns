(function () {

  /* @ngInject */
  function config ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
/*
    $stateProvider
      .state('home', { url: '/test1', templateUrl: '/views/test1/test1.html', controller: 'Test1Ctrl', controllerAs: 'vm'})
      .state('test2', { url: '/test2', templateUrl: '/views/test2/test2.html', controller: 'Test2Ctrl', controllerAs: 'vm'});

    $urlRouterProvider.otherwise('/test1');*/
  }

  /* @ngInject */
  function GcloudDnsCtrl () {
    var vm = this;
    vm.appTitle = 'Gcloud Dns';
  }

  angular.module('GcloudDns', [
    'ui.router',
    'ngMaterial',
    'xd.layout.PageHeader',
    'xd.tmpls'
  ])
    .config(config)

    .controller('gcloudDnsCtrl', GcloudDnsCtrl);
})();