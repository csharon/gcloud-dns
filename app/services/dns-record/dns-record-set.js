(function () {

  /**
   * @ngdoc service
   * @name xd.services.DNSRecordSet:DNSRecordSet
   *
   */
  angular.module('xd.services.DNSRecordSet', ['xd.services.ArrayCollection'])
    .factory('DNSRecordSet', wrapper);

  /* @ngInject */
  function wrapper(ArrayCollection) {

    function DNSRecordSet(data) {
      this.fromServer = false;
      this.pendingChanges = false;
      this.allowDuplicates = true;
      this.rrdatas = new ArrayCollection();
      if (!_.isUndefined(data)) {
        this.name = data.name || '';
        this.type = data.type || '';
        this.ttl = data.ttl || 8600;
        this.status = data.status || 'unchanged';
      } else {
        this.name = '';
        this.type = '';
        this.ttl = 8600;
        this.status = 'new';
      }
    }

    DNSRecordSet.prototype.toJson = toJson;
    DNSRecordSet.prototype.isNew = isNew;
    DNSRecordSet.prototype.kind = 'dns#resourceRecordSet';

    function toJson() {
      return {
        name: this.name,
        type: this.type,
        ttl: this.ttl,
        rrdatas: _.map(this.rrdatas.items, function (item) { return item.toString(); })
      };
    }

    function isNew() {
      return !this.fromServer;
    }

    return DNSRecordSet;

  }

})();
