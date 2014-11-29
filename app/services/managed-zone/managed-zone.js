(function () {

  /**
   * @ngdoc service
   * @name xd.services.ManagedZone:managedZone
   *
   */
  angular.module('xd.services.ManagedZone', ['xd.services.ArrayCollection', 'xd.services.ResourceRecordSet'])
    .factory('ManagedZone', wrapper);

  /* @ngInject */
  function wrapper(ArrayCollection, ResourceRecordSet) {
    function ManagedZone(data) {
      if (!_.isUndefined(data)) {
        this.name = data.name || '';
        this.dnsName = data.dnsName || '';
        this.description = data.description || '';
        this.id = data.id || 0;
        this.nameServers = data.nameServers || [];
        this.creationTime = data.creationTime || '';
        this.records = new ArrayCollection(_.map(data.records, function (item) { return new ResourceRecordSet(item); })) || new ArrayCollection();
      } else {
        this.name = '';
        this.dnsName = '';
        this.description = '';
        this.id = 0;
        this.nameServers = [];
        this.creationTime = '';
        this.records = new ArrayCollection();
      }

    }
    ManagedZone.prototype.toJson = toJson;
    ManagedZone.prototype.kind = 'dns#managedZone';

    function toJson() {
      return {
        name: this.name,
        dnsName: this.dnsName,
        description: this.description
      };
    }

    return ManagedZone;
  }

})();
