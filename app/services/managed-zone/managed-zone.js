(function () {

  /**
   * @ngdoc service
   * @name xd.services.ManagedZone:managedZone
   *
   */
  angular.module('xd.services.ManagedZone', ['xd.services.ArrayCollection'])
    .factory('ManagedZone', wrapper);

  /* @ngInject */
  function wrapper(ArrayCollection) {
    function ManagedZone(data) {
      if (!_.isUndefined(data)) {
        this.kind = 'dns#managedZone';
        this.name = data.name || '';
        this.dnsName = data.dnsName || '';
        this.description = data.description || '';
        this.id = data.id || 0;
        this.nameServers = data.nameServers || [];
        this.creationTime = data.creationTime || '';
        this.records = new ArrayCollection(data.records) || new ArrayCollection();
      } else {
        this.kind = 'dns#managedZone';
        this.name = '';
        this.dnsName = '';
        this.description = '';
        this.id = 0;
        this.nameServers = [];
        this.creationTime = '';
        this.records = new ArrayCollection();
      }

    }
    ManagedZone.prototype.toManagedZoneJson = toManagedZoneJson;

    function toManagedZoneJson() {
      return {
        kind: this.kind,
        name: this.name,
        dnsName: this.dnsName,
        description: this.description,
        id: this.id,
        nameServers: this.nameServers,
        creationTime: this.creationTime
      };
    }

    return ManagedZone;
  }

})();
