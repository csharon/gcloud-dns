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
    api.getRecord = getRecord;
    api.addRecord = addRecord;
    api.updateRecord = updateRecord;

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
      var originalSOA = getRecord(api.zone.records, 'SOA', zone.dnsName);
      if (angular.isDefined(originalSOA)) {
        addNewSOA(originalSOA);
      }

    }

    function getRecord(records, recordType, recordName) {

      if (angular.isString(recordType) && angular.isString(recordName)) {
        return _.find(records, {type: recordType, name: recordName});
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

    function recordExists(list, record) {
      return angular.isDefined(getRecord(list, record.type, record.name));
    }

    function addRecord(record) {
      if (!recordExists(api.zone.records, record) && !recordExists(api.changeSet.additions, record)) {
        api.changeSet.additions.push(record);
        record.status = 'new';
        api.updatedRecordView.push(record);
      }

    }

    function updateRecord(newRecord, oldRecord) {
      if (oldRecord.status === 'new') {
        // Update additions
        _.remove(api.changeSet.additions, function (record) {
          return record.name === oldRecord.name && record.type === oldRecord.type;
        });
        api.changeSet.additions.push(newRecord);

        // Update the view
        _.remove(api.updatedRecordView, function (record) {
          return record.name === oldRecord.name && record.type === oldRecord.type;
        });
        api.updatedRecordView.push(newRecord);
      } else {
        api.changeSet.additions.push(newRecord);
        api.changeSet.deletions.push(oldRecord);
        newRecord.status = 'updated';

        _.remove(api.updatedRecordView, function (record) {
          return record.name === oldRecord.name && record.type === oldRecord.type;
        });
        api.updatedRecordView.push(newRecord);
      }

    }

    return api;
  }

})();
