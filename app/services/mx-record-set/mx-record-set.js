(function () {

  /**
   * @ngdoc service
   * @name xd.services.MxRecordSet:mxRecordSet
   *
   */
  angular.module('xd.services.MXRecordSet', ['xd.services.MXDataValue', 'xd.services.DNSRecordSet'])
    .factory('MXRecordSet', wrapper);

  /* @ngInject */

  function wrapper(DNSRecordSet, MXDataValue) {
    function MXRecordSet(data) {
      DNSRecordSet.call(this, data);

      if (!_.isUndefined(data) && !_.isUndefined(data.rrdatas)) {
        this.rrdatas.items = _.map(data.rrdatas, function (rrdata) { return new MXDataValue(rrdata);});
      }
    }

    MXRecordSet.prototype = Object.create(DNSRecordSet.prototype);

    return MXRecordSet;
  }


})();
