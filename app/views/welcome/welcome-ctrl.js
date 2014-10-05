(function () {

  /**
   * @ngdoc function
   * @name xd.views.Welcome:welcomeCtrl
   *
   */
  angular.module('xd.views.Welcome', [])
    .controller('welcomeCtrl', WelcomeCtrl);

  /* @ngInject */
  function WelcomeCtrl() {
    var vm = this;
    vm.name = 'WelcomeCtrl';
  }

})();
