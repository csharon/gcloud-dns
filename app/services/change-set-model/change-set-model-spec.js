/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ChangeSetModel', function () {

  var model, zone, aRecord, updatedRecord, ManagedZone;
  beforeEach( module('xd.services.ChangeSetModel'));

  beforeEach(inject(function (changeSetModel, _ManagedZone_) {
    model = changeSetModel;
    ManagedZone = _ManagedZone_;
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
    aRecord = {
      name: 'www.taco.com.',
      type: 'A',
      ttl: 21600,
      rrdatas: [
        '192.168.1.1'
    ]};
  }));

  it('should have an array named updatedRecordView', function () {
    expect(angular.isArray(model.updatedRecordView.items)).to.be.true;
  });

  describe('createChangeSet', function () {

    it('should have 2 records in the updatedRecordView', function () {
      model.createChangeSet(new ManagedZone(zone));
      expect(model.updatedRecordView.items.length).to.equal(2);
    });

    it('should remove the old soa record', function () {
      model.createChangeSet(new ManagedZone(zone));
      expect(model.changeSet.deletions.items.length).to.equal(1);
    });

    it('should increment the serial number of the new soa record', function () {
      model.createChangeSet(new ManagedZone(zone));
      expect(model.changeSet.additions.items[0].rrdatas[0]).to.equal('ns-cloud-b1.googledomains.com. dns-admin.google.com. 1 21600 3600 1209600 300');
    });

  });

  describe('record management', function () {

    describe('addRecord', function () {
      var mz;
      beforeEach(function () {
        mz = new ManagedZone(zone);
        model.createChangeSet(mz);
        model.addRecord(aRecord);
      });
      it('should add a record to the changeSet.additions', function () {

        expect(model.changeSet.additions.items.length).to.equal(2);
      });


      it('should add the new record to the updatedRecordView', function () {
        expect(model.updatedRecordView.containsItem(aRecord)).to.be.true;

      });

      it('should add a new status to the record', function () {
        expect(aRecord.status).to.equal('new');
      });

      it('should not add the new record to zone.records', function () {
        expect(mz.records.items.length).to.equal(2);
      });


    });

    describe('duplicate records', function () {

      it('should not add a duplicate record', function () {
        zone.records.push(aRecord);
        model.createChangeSet(new ManagedZone(zone));
        model.addRecord(aRecord);
        expect(model.changeSet.additions.items.length).to.equal(1);
      });
    });

    describe('updateRecord', function () {
      var mz;
      beforeEach(function () {
        zone.records.push(aRecord);
        mz = new ManagedZone(zone);
        model.createChangeSet(mz);
        updatedRecord = angular.copy(aRecord);
        updatedRecord.name = 'mail.taco.com.';
        model.updateRecord(updatedRecord, aRecord);
      });
      it('should add the new record to the changeSet.additions', function () {
        expect(model.changeSet.additions.items.length).to.equal(2);
        expect(model.changeSet.additions.containsItem(updatedRecord)).to.be.true;

      });

      it('should add the old record to the changeSet.deletions', function () {
        expect(model.changeSet.deletions.items.length).to.equal(2);
        expect(model.changeSet.deletions.containsItem(aRecord)).to.be.true;
      });

      it('should add the updated record to the updatedRecordView', function () {
        //expect(model.updatedRecordView.length).to.equal(3);
        expect(model.updatedRecordView.containsItem(updatedRecord)).to.be.true;
        expect(model.updatedRecordView.containsItem(aRecord)).to.be.false;
      });

      it('should add a updated status to the record', function () {
        expect(updatedRecord.status).to.equal('updated');
      });

      it('should not add the updated record to zone.records', function () {
        expect(mz.records.items.length).to.equal(3);
      });
    });

    describe('updating new records', function () {
      beforeEach(function () {
        model.createChangeSet(new ManagedZone(zone));
        model.addRecord(aRecord);
        updatedRecord = angular.copy(aRecord);
        updatedRecord.name = 'mail.taco.com.';
        model.updateRecord(updatedRecord, aRecord);
      });

      it('should modify the existing elements on the additions array', function () {
        expect(model.changeSet.additions.containsItem(updatedRecord)).to.be.true;
        expect(model.changeSet.additions.containsItem(aRecord)).to.be.false;
      });
      it ('should modify the existing element in the updated view list', function () {
        expect(model.updatedRecordView.containsItem(updatedRecord)).to.be.true;
        expect(model.changeSet.deletions.containsItem(aRecord)).to.be.false;
      });


    });

    describe('removeRecord', function () {
      beforeEach(function () {
        zone.records.push(aRecord);
        model.createChangeSet(new ManagedZone(zone));
        model.removeRecord(aRecord);
      });
      it('should add the record to the changeSet.deletions', function () {
        expect(model.changeSet.deletions.containsItem(aRecord)).to.be.true;
      });

      it('should add a deleted status to the record', function () {
        expect(aRecord.status).to.equal('deleted');
      });
    });

    describe('deleting new records', function () {
      beforeEach(function () {
        model.createChangeSet(new ManagedZone(zone));
        model.addRecord(aRecord);
        model.removeRecord(aRecord);
      });

      it('should remove existing elements on the additions array', function () {
        expect(model.changeSet.additions.containsItem(aRecord)).to.be.false;
      });
      it ('should remove the existing element in the updated view list', function () {
        expect(model.updatedRecordView.containsItem(aRecord)).to.be.false;
      });


    });
  });


});
