(function () {

  /**
   * @ngdoc function
   * @name xd.views.Welcome:welcomeCtrl
   *
   */
  angular.module('xd.views.Welcome', ['xd.api.GoogleOauth'])
    .controller('welcomeCtrl', WelcomeCtrl);

  /* @ngInject */
  function WelcomeCtrl(googleOAuth) {
    var vm = this;
    vm.name = 'WelcomeCtrl';
    vm.auth = googleOAuth;
  }

})();
