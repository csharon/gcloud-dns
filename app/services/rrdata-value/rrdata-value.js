(function () {

  /**
   * @ngdoc service
   * @name xd.services.RRDataValue:RRDataValue
   *
   */
  angular.module('xd.services.RRDataValue', [])
    .factory('RRDataValue', wrapper);

  /* @ngInject */
  function wrapper() {

    function RRDataValue(val) {
      if (_.isUndefined(val)) {
        this.rrdata = '';
      } else {
        this.fromString(val);
      }
    }

    RRDataValue.prototype.toString = toString;
    RRDataValue.prototype.fromString = fromString;

    function toString() {
      return this.rrdata;
    }

    function fromString(rrdataVal) {
      this.rrdata = _.isString(rrdataVal) ? rrdataVal : '';

    }

    return RRDataValue;
  }

})();
