(function () {

  /**
   * @ngdoc service
   * @name xd.services.MXDataValue:MXDataValue
   *
   */
  angular.module('xd.services.MXDataValue', [])
    .factory('MXDataValue', wrapper);

  /* @ngInject */

  function wrapper() {
    function MXDataValue(val) {
      if (_.isUndefined(val)) {
        this.priority = 0;
        this.server = 'mailServer';
      }else{
        this.fromString(val);
      }
    }
    MXDataValue.prototype.toString = toString;
    MXDataValue.prototype.fromString = fromString;

    function toString() {
      return this.priority + ' ' + this.server;
    }

    function fromString(rrdataVal) {
      var mxParts = rrdataVal.split(' ');

      this.priority = parseInt(mxParts[0], 10);
      this.server = mxParts[1];
    }

    return MXDataValue;

  }


})();
