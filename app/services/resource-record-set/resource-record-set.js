(function () {

  /**
   * @ngdoc service
   * @name xd.services.ResourceRecordSet:resourceRecordSet
   *
   */
  angular.module('xd.services.ResourceRecordSet', [
    'xd.services.ArrayCollection', 'xd.services.RRDataValue', 'xd.services.DNSRecordSet'])
    .factory('ResourceRecordSet', wrapper);

  /* @ngInject */
  function wrapper(ArrayCollection, RRDataValue, DNSRecordSet) {

    function ResourceRecordSet(data) {
      DNSRecordSet.call(this, data);

      if (!_.isUndefined(data) && !_.isUndefined(data.rrdatas)) {
        this.rrdatas.items = _.map(
          data.rrdatas, function (rrdata) { return new RRDataValue(rrdata); }
        );
      }
    }

    ResourceRecordSet.prototype = Object.create(DNSRecordSet.prototype);

    return ResourceRecordSet;
  }

})();
