(function () {

  /**
   * @ngdoc service
   * @name xd.services.SOADataValue:SOADataValue
   *
   */
  angular.module('xd.services.SOADataValue', [])
    .factory('SOADataValue', wrapper);

  /* @ngInject */
  function wrapper() {

    function SOADataValue(val) {
      if (_.isUndefined(val)) {
        this.nameServer = 'nameServer';
        this.email = 'email';
        this.serial = 0;
        this.refreshRate = 21600;
        this.updateRetry = 3600;
        this.expiry = 1209600;
        this.minCache = 300;
      } else {
        this.fromString(val);
      }
    }

    SOADataValue.prototype.toString = toString;
    SOADataValue.prototype.fromString = fromString;

    function toString() {
      return this.nameServer.concat(' ')
        .concat(this.email).concat(' ')
        .concat(this.serial).concat(' ')
        .concat(this.refreshRate).concat(' ')
        .concat(this.updateRetry).concat(' ')
        .concat(this.expiry).concat(' ')
        .concat(this.minCache);
    }

    function fromString(rrdataVal) {
      var soaParts = rrdataVal.split(' ');

      this.nameServer = soaParts[0];
      this.email = soaParts[1];
      this.serial = parseInt(soaParts[2], 10);
      this.refreshRate = parseInt(soaParts[3], 10);
      this.updateRetry = parseInt(soaParts[4], 10);
      this.expiry = parseInt(soaParts[5], 10);
      this.minCache = parseInt(soaParts[6], 10);

    }

    return SOADataValue;
  }

})();
