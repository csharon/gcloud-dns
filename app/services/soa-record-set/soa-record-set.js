(function () {

  /**
   * @ngdoc service
   * @name xd.services.SOARecordSet:SOARecordSet
   *
   */
  angular.module('xd.services.SOARecordSet', ['xd.services.SOARRDataValue', 'xd.services.DNSRecordSet'])
    .factory('SOARecordSet', wrapper);

  /* @ngInject */
  function wrapper(DNSRecordSet, SOARRDataValue) {

    function SOARecordSet(data) {
      DNSRecordSet.call(this, data);

      if (!_.isUndefined(data) && !_.isUndefined(data.rrdatas)) {
        this.rrdatas.items = _.map(data.rrdatas, function (rrdata) { return new SOARRDataValue(rrdata);});
      }
    }

    SOARecordSet.prototype = Object.create(DNSRecordSet.prototype);

    return SOARecordSet;
  }

})();
