(function () {

  /**
   * @ngdoc service
   * @name xd.services.ChangeSetModel:changeSetModel
   *
   */
  angular.module('xd.services.ChangeSetModel', [])
    .factory('changeSetModel', ChangeSetModel);

  /* @ngInject */
  function ChangeSetModel() {

    //Public API
    var api = {};
    // Properties
    api.zone = {};
    api.changeSet = {};
    api.updatedRecordView = [];

    // Methods
    api.createChangeSet = createChangeSet;

    // Implementation
    function createChangeSet(zone) {
      api.zone = zone;
      // Copy the records to updatedRecordView
      api.updatedRecordView = angular.copy(zone.records);
      // Reset changeSet
      api.changeSet = {additions: [], deletions: []};

      // Add the SOA records to the Change Set
      var originalSOA = getRecord('SOA');
      if (angular.isDefined(originalSOA)) {
        addNewSOA(originalSOA);
      }

    }

    function getRecord(recordType) {
      if (angular.isString(recordType)) {
        return _.find(api.zone.records, {type: recordType});
      }
      return null;
    }

    function addNewSOA(originalSOA) {
      var newSOA = angular.copy(originalSOA);
      // Create the values for the new SOA record.
      var newSOAVal = angular.copy(getSOAValues(newSOA.rrdatas[0]));
      // Increment the serial number of the new SOA record.
      newSOAVal.serial = newSOAVal.serial + 1;
      // Assemble the array values and stringify them for submission.
      newSOA.rrdatas[0] = _.values(newSOAVal).join(' ');
      // Push the new SOA record to the Google API
      api.changeSet.additions.push(newSOA);
      api.changeSet.deletions.push(originalSOA);
    }

    function getSOAValues(rrdataVal) {
      var soaParts = rrdataVal.split(' ');
      return {
        nameServer: soaParts[0],
        email: soaParts[1],
        serial: parseInt(soaParts[2], 10),
        refreshRate: parseInt(soaParts[3], 10),
        updateRetry: parseInt(soaParts[4], 10),
        expiry: parseInt(soaParts[5], 10),
        minCache: parseInt(soaParts[6], 10)
      };
    }



    return api;
  }

})();
