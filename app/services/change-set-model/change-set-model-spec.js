/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe.only('xd.services.ChangeSetModel', function () {

  var model, zone;
  beforeEach( module('xd.services.ChangeSetModel'));

  beforeEach(inject(function (changeSetModel) {
    model = changeSetModel;
    zone = {
      name: 'taco-zone',
      dnsName: 'taco.com.',
      description: 'just a test taco zone.',
      records: [
        {
          name: 'taco.com.',
          type: 'NS',
          ttl: 8600,
          rrdatas: [
            'ns1.taco.com.',
            'ns1.taco.com.',
            'ns1.taco.com.',
            'ns1.taco.com.'
          ]
        },
        {
          name: 'taco.com.',
          type: 'SOA',
          ttl: 21600,
          rrdatas: [
            'ns-cloud-b1.googledomains.com. dns-admin.google.com. 0 21600 3600 1209600 300'
          ]
        }
      ]
    };
  }));

  it('should have an array named updatedRecordView', function () {
    expect(angular.isArray(model.updatedRecordView)).to.be.true;
  });

  describe('createChangeSet', function () {

    it('should have 2 records in the updatedRecordView', function () {
      model.createChangeSet(zone);
      expect(model.updatedRecordView.length).to.equal(2);
    });

    it('should remove the old soa record', function () {
      model.createChangeSet(zone);
      expect(model.changeSet.deletions.length).to.equal(1);
    });

    it('should increment the serial number of the new soa record', function () {
      model.createChangeSet(zone);
      expect(model.changeSet.additions[0].rrdatas[0]).to.equal('ns-cloud-b1.googledomains.com. dns-admin.google.com. 1 21600 3600 1209600 300');
    });

  });

  describe('addRecord', function () {
    it('should add a record to the changeSet.additions');
    it('should add the new record to the updatedRecordView');
    it('should add a new status to the record');
    it('should not add the new record to zone.records');
  });

  describe('updateRecord', function () {
    it('should add the new record to the changeSet.additions');
    it('should add the old record to the changeSet.deletions');
    it('should add the updated record to the updatedRecordView');
    it('should remove the original record from the updatedRecordView');
    it('should add a updated status to the record');
    it('should not add the updated record to zone.records');
  });

  describe('removeRecord', function () {
    it('should add the record to the changeSet.deletions');
    it('should add a deleted status to the record');
  });

});
