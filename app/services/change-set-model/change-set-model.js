(function () {

  /**
   * @ngdoc service
   * @name xd.services.ChangeSetModel:changeSetModel
   *
   */
  angular.module('xd.services.ChangeSetModel', [
    'xd.services.ArrayCollection',
    'xd.services.ChangeSet',
    'xd.services.ManagedZone',
    'xd.services.ResourceRecordSet'
  ])
    .factory('changeSetModel', ChangeSetModel)


  /* @ngInject */
  function ChangeSetModel(ArrayCollection, ChangeSet, ResourceRecordSet) {

    //Public API
    var api = {};
    // Properties
    api.zone = {};
    api.changeSet = new ChangeSet();
    api.currentRecord = new ResourceRecordSet();
    api.updatedRecordView = new ArrayCollection();
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
      api.updatedRecordView.items = _.map(zone.records.items, function (record) {
        record.status = 'unchanged';
        return record;
      });
      updatePendingChanges();
      resetChangeSet();

      // Add the SOA records to the Change Set
      var originalSOA = api.zone.records.getItem({type: 'SOA', name: zone.dnsName});
      if (angular.isDefined(originalSOA)) {
        addNewSOA(originalSOA);
      }

    }

    function resetChangeSet() {
      // Reset changeSet
      api.changeSet = new ChangeSet();
    }

    function addNewSOA(originalSOA) {
      var newSOA = angular.copy(originalSOA);
      // Create the values for the new SOA record.
      var newSOAVal = angular.copy(getSOAValues(newSOA.rrdatas.items[0]));
      // Increment the serial number of the new SOA record.
      newSOAVal.serial = newSOAVal.serial + 1;
      // Assemble the array values and stringify them for submission.
      newSOA.rrdatas.items[0] = _.values(newSOAVal).join(' ');
      // Push the new SOA record to the Google API
      updateRecord(newSOA, originalSOA);

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

    function saveRecord(record) {
      if (record.isNew()) {
        addRecord(record);
      } else {
        updateRecord(record, api.currentRecord);
      }
    }

    function addRecord(record) {
      if (!api.zone.records.containsItem(record) && !api.changeSet.additions.containsItem(record)) {
        api.changeSet.addToAdditions(record);
        record.status = 'new';
        api.updatedRecordView.addItem(record);
        updatePendingChanges();
      }

    }

    function removeRecord(record) {

      // If the record status is new
      if (record.status === 'new') {
        api.changeSet.removeFromAdditions({name: record.name, type: record.type});
        api.updatedRecordView.removeItem({name: record.name, type: record.type});

      } else {
        // add it to the changeset
        api.changeSet.addToDeletions(record);
        // mark it as deleted
        record.status = 'deleted';
        // Update the view
        //api.updatedRecordView.removeItem({name: record.name, type: record.type});
        //api.updatedRecordView.addItem(record);
        api.updatedRecordView.updateItem({name: record.name, type: record.type}, record);
      }

      updatePendingChanges();
    }

    function updateRecord(newRecord, oldRecord) {
      if (oldRecord.status === 'new') {
        api.changeSet.removeFromAdditions({name: oldRecord.name, type: oldRecord.type});
        api.changeSet.addToAdditions(newRecord);
        api.updatedRecordView.updateItem({name: oldRecord.name, type: oldRecord.type}, newRecord);
      } else {
        api.changeSet.addToAdditions(newRecord);
        api.changeSet.addToDeletions(oldRecord);
        newRecord.status = 'updated';
        api.updatedRecordView.removeItem({name: oldRecord.name, type: oldRecord.type});
        api.updatedRecordView.addItem(newRecord);
      }

      updatePendingChanges();
    }

    function updatePendingChanges() {
      api.pendingChanges = _.groupBy(api.updatedRecordView.items, 'status');
    }

    return api;
  }

})();
