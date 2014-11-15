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
    api.currentRecord = {};
    api.currentRecordIsNew = false;
    api.updatedRecordView = [];
    api.hasChanges = hasChanges;
    api.getRecord = getRecord;
    api.addRecord = addRecord;
    api.updateRecord = updateRecord;
    api.saveRecord = saveRecord;
    api.removeRecord = removeRecord;
    api.pendingChanges = {unchanged: [], new: [], updated: [], deleted: []};

    // Methods
    api.createChangeSet = createChangeSet;
    api.resetChangeSet = resetChangeSet;

    // Implementation
    function createChangeSet(zone) {
      api.zone = zone;
      // Copy the records to updatedRecordView
      api.updatedRecordView = _.map(zone.records, function (record) {
        record.status = 'unchanged';
        return record;
      });
      updatePendingChanges();
      resetChangeSet();

      // Add the SOA records to the Change Set
      var originalSOA = getRecord(api.zone.records, 'SOA', zone.dnsName);
      if (angular.isDefined(originalSOA)) {
        addNewSOA(originalSOA);
      }

    }

    function resetChangeSet() {
      // Reset changeSet
      api.changeSet = {additions: [], deletions: []};
    }

    function hasChanges() {
      return angular.isDefined(api.changeSet.additions) && (api.changeSet.additions.length > 0 || api.changeSet.deletions.length > 0);
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
      updateRecord(newSOA, originalSOA);
      //api.changeSet.additions.push(newSOA);
      //api.changeSet.deletions.push(originalSOA);

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

    function saveRecord(record) {
      if (api.currentRecordIsNew) {
        addRecord(record);
      } else {
        updateRecord(record, api.currentRecord);
      }
    }

    function addRecord(record) {
      if (!recordExists(api.zone.records, record) && !recordExists(api.changeSet.additions, record)) {
        api.changeSet.additions.push(record);
        record.status = 'new';
        api.updatedRecordView.push(record);
        updatePendingChanges();
      }

    }

    function removeRecord(record) {

      // If the record status is new
      if (record.status === 'new') {
        // remove it from the changeSet.additions
        _.remove(api.changeSet.additions, function (original) {
          return original.name === record.name && original.type === record.type;
        });
        // update the view by removing the new record
        _.remove(api.updatedRecordView, function (original) {
          return original.name === record.name && original.type === record.type;
        });
      } else {
        // add it to the changeset
        api.changeSet.deletions.push(record);
        // mark it as deleted
        record.status = 'deleted';
        // Update the view
        _.remove(api.updatedRecordView, function (original) {
          return original.name === record.name && original.type === record.type;
        });
        api.updatedRecordView.push(record);
      }
      updatePendingChanges();
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
      updatePendingChanges();
    }

    function updatePendingChanges() {
      api.pendingChanges = _.groupBy(api.updatedRecordView, 'status');
    }

    return api;
  }

})();
