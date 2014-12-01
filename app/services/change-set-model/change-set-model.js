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
    .factory('changeSetModel', ChangeSetModel);


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
        updateRecord(originalSOA.getNext(), originalSOA);
      }

    }

    function resetChangeSet() {
      // Reset changeSet
      api.changeSet = new ChangeSet();
    }

    function saveRecord(record) {
      if (record.isNew() && !record.pendingChanges) {
        addRecord(record);
      } else {
        updateRecord(record, api.currentRecord);
      }
    }

    function addRecord(record) {
      if (!api.zone.records.containsItem(record) && !api.changeSet.additions.containsItem(record)) {
        record.status = 'new';
        record.pendingChanges = true;
        api.changeSet.addTo(record, 'additions');
        api.updatedRecordView.addItem(record);
        updatePendingChanges();
      }

    }

    function removeRecord(record) {

      // If the record status is new
      if (record.status === 'new') {
        api.changeSet.removeFrom({name: record.name, type: record.type}, 'additions');
        api.updatedRecordView.removeItem({name: record.name, type: record.type});

      } else {
        // add it to the changeset
        api.changeSet.addTo(record, 'deletions');
        // mark it as deleted
        record.status = 'deleted';
        // Update the view
        api.updatedRecordView.updateItem({name: record.name, type: record.type}, record);
      }

      updatePendingChanges();
    }

    function updateRecord(newRecord, oldRecord) {
      if (oldRecord.status === 'new') {
        api.changeSet.updateItem({name: oldRecord.name, type: oldRecord.type}, newRecord, 'additions');
        api.updatedRecordView.updateItem({name: oldRecord.name, type: oldRecord.type}, newRecord);
      } else {
        api.changeSet.addTo(newRecord, 'additions');
        api.changeSet.addTo(oldRecord, 'deletions');
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
