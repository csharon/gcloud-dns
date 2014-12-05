(function () {

  /**
   * @ngdoc service
   * @name xd.services.DNSRecordFactory:DNSRecordFactory
   *
   */
  angular.module('xd.services.DNSRecordFactory', [
    'xd.services.ResourceRecordSet',
    'xd.services.SOARecordSet',
    'xd.services.MXRecordSet'
  ])
    .factory('DNSRecordFactory', DNSRecordFactory);

  /* @ngInject */
  function DNSRecordFactory(ResourceRecordSet, SOARecordSet, MXRecordSet) {

    var api = {};
    api.createDNSRecord = createDNSRecord;

    function createDNSRecord(data) {
      if (_.isUndefined(data)) {
        return new ResourceRecordSet();
      }
      switch(data.type) {
        case 'SOA':
          return new SOARecordSet(data);

        case 'MX':
          return new MXRecordSet(data);

        default:
          return new ResourceRecordSet(data);
      }
    }

    return api;
  }


})();
