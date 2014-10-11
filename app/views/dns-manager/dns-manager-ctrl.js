(function () {

  /**
   * @ngdoc function
   * @name xd.views.DnsManager:dnsManagerCtrl
   *
   */
  angular.module('xd.views.DnsManager', ['xd.components.ZoneList'])
    .controller('dnsManagerCtrl', DnsManagerCtrl);

  /* @ngInject */
  function DnsManagerCtrl() {
    var vm = this;
    vm.name = 'DnsManagerCtrl';
  }

})();
