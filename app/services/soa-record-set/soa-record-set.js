(function () {

  /**
   * @ngdoc service
   * @name xd.services.SOARecordSet:SOARecordSet
   *
   */
  angular.module('xd.services.SOARecordSet', [
    'xd.services.SOADataValue', 'xd.services.DNSRecordSet'
  ])
    .factory('SOARecordSet', wrapper);

  /* @ngInject */
  function wrapper(DNSRecordSet, SOADataValue) {

    function SOARecordSet(data) {
      DNSRecordSet.call(this, data);

      if (!_.isUndefined(data) && !_.isUndefined(data.rrdatas)) {
        this.rrdatas.items = _.map(
          data.rrdatas, function (rrdata) { return new SOADataValue(rrdata);}
        );
      } else {
        this.rrdatas.addItem(new SOADataValue());
      }
    }

    SOARecordSet.prototype = Object.create(DNSRecordSet.prototype);
    SOARecordSet.prototype.getNext = getNext;

    function getNext() {
      var next = new SOARecordSet(this.toJson());
      next.rrdatas.items[0].serial = next.rrdatas.items[0].serial + 1;
      return next;
    }

    return SOARecordSet;
  }

})();
