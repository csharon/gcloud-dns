(function () {

  /**
   * @ngdoc service
   * @name xd.services.ResourceRecordSet:resourceRecordSet
   *
   */
  angular.module('xd.services.ResourceRecordSet', ['xd.services.ArrayCollection'])
    .factory('ResourceRecordSet', wrapper);

  /* @ngInject */
  function wrapper(ArrayCollection) {

    function ResourceRecordSet(data) {
      this.fromServer = false;
      if (!_.isUndefined(data)) {
        this.name = data.name || '';
        this.type = data.type || '';
        this.ttl = data.ttl || 8600;
        this.rrdatas = new ArrayCollection(data.rrdatas) || new ArrayCollection();
        this.status = data.status || 'unchanged';
      } else {
        this.name = '';
        this.type = '';
        this.ttl = 8600;
        this.rrdatas = new ArrayCollection();
        this.status = 'new';
      }
    }

    ResourceRecordSet.prototype.toJson = toJson;
    ResourceRecordSet.prototype.isNew = isNew;
    ResourceRecordSet.prototype.kind = 'dns#resourceRecordSet';

    function toJson() {
      return {
        kind: this.kind,
        name: this.name,
        type: this.type,
        ttl: this.ttl,
        rrdatas: this.rrdatas.items
      };
    }

    function isNew() {
      return !this.fromServer;
    }

    return ResourceRecordSet;
  }

})();
