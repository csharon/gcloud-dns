(function () {

  /**
   * @ngdoc service
   * @name xd.services.MXRRDataValue:MXRRDataValue
   *
   */
  angular.module('xd.services.MXRRDataValue', [])
    .factory('MXRRDataValue', wrapper);

  /* @ngInject */

  function wrapper() {
    function MXRRDataValue(val) {
      if (_.isUndefined(val)) {
        this.priority = 0;
        this.server = '';
      }else{
        this.fromString(val);
      }
    }
    MXRRDataValue.prototype.toString = toString;
    MXRRDataValue.prototype.fromString = fromString;

    function toString() {
      return this.priority + ' ' + this.server;
    }

    function fromString(rrdataVal) {
      var mxParts = rrdataVal.split(' ');

      this.priority = mxParts[0];
      this.server = mxParts[1];
    }

    return MXRRDataValue;

  }


})();
