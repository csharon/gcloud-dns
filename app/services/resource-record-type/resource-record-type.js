(function () {
  'use strict';
  /*jshint quotmark: double */
  var ResourceRecordType = {
    "A": {"type": "A", "allowDuplicates": true, "rrdataType": "ip_address", "name": "hostname"},
    "AAAA": {"type": "AAAA", "allowDuplicates": true, "rrdataType": "ip6_address"},
    "CNAME": {"type": "CNAME", "allowDuplicates": true, "rrdataType": "hostname"},
    "MX": {"type": "MX", "allowDuplicates": false, "rrdataType": ["priority", "hostname"]},
    "NS": {"type": "NS", "allowDuplicates": false, "rrdataType": ["ip_address", "hostname"]},
    "PTR": {"type": "PTR", "allowDuplicates": true, "rrdataType": ["hostname"], "name": "ip_address"},
    "SOA": {"type": "SOA", "allowDuplicates": false, "rrdataType": ["name_server", "email", "serial", "refresh", "retry", "expire", "cache"]},
    "SPF": {"type": "SPF", "allowDuplicates": false, "rrdataType": "string"},
    "SRV": {"type": "SRV", "allowDuplicates": false, "rrdataType": "ip_address"},
    "TXT": {"type": "TXT", "allowDuplicates": true, "rrdataType": "string"}
  };
  /*jshint quotmark: single */
  /**
   * @ngdoc service
   * @name xd.services.ResourceRecordType:resourceRecordType
   *
   */
  angular.module('xd.services.ResourceRecordType', [])
    .constant('ResourceRecordType', ResourceRecordType);


})();
