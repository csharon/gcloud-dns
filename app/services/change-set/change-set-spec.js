/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ChangeSet', function () {

  var ChangeSet, SOARecordSet, records = [
    {
      name: 'taco.com.',
      type: 'NS',
      ttl: 8600,
      rrdatas: [
        'ns1.taco.com.',
        'ns2.taco.com.',
        'ns3.taco.com.',
        'ns4.taco.com.'
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
  ];
  beforeEach( module('xd.services.ChangeSet'));
  beforeEach( module('xd.services.SOARecordSet'));

  beforeEach(inject(function (_ChangeSet_, _SOARecordSet_) {
    ChangeSet = _ChangeSet_;
    SOARecordSet = _SOARecordSet_;
  }));

  describe('ChangeSet constructor', function () {

    it('should create a ChangeSet when no args are provided', function () {
      var cs = new ChangeSet();
      expect(_.isArray(cs.additions.items)).to.be.true;
      expect(_.isArray(cs.deletions.items)).to.be.true;
    });

    it('should create a ChangeSet when you pass in an object.', function () {
      var data = {
        additions: records,
        deletions: [records[0]]
      };
      var cs = new ChangeSet(data);
      expect(cs.additions.items.length).to.equal(2);
      expect(cs.deletions.items.length).to.equal(1);
    });

    it('should create a ChangeSet when you pass in an object with fkd up arrays', function () {
      var data = {
        additions: 42,
        deletions: 'meat'
      };
      var cs = new ChangeSet(data);
      expect(cs.additions.items.length).to.equal(0);
      expect(cs.deletions.items.length).to.equal(0);
    });

  });

  describe('additions', function () {
    var cs;
    beforeEach(function () {
      cs = new ChangeSet();
      cs.addTo(records[0], 'additions');
    });

    it('should add an object to the additions collection when you call addToAdditions', function () {
      expect(cs.additions.items.length).to.equal(1);
    });

    it('should remove an object from the additions collection when you call removeFromAdditions', function () {
      cs.removeFrom(records[0], 'additions');
      expect(cs.additions.items.length).to.equal(0);
    });

  });

  describe('deletions', function () {
    var cs;
    beforeEach(function () {
      cs = new ChangeSet();
      cs.addTo(records[0], 'deletions');
    });

    it('should add an object to the deletions collection when you call addToDeletions', function () {
      expect(cs.deletions.items.length).to.equal(1);
    });

    it('should remove an object from the deletions collection when you call removeFromDeletions', function () {
      cs.removeFrom(records[0], 'deletions');
      expect(cs.deletions.items.length).to.equal(0);
    });

  });

  describe('toJson', function () {

    it('should generate a json object that makes google happy', function () {
      var soa = new SOARecordSet(records[1]);
      var next = soa.getNext();
      var cs = new ChangeSet();
      cs.addTo(soa, 'deletions');
      cs.addTo(next, 'additions');
      expect(cs.toJson().additions[0].rrdatas[0]).to.equal('ns-cloud-b1.googledomains.com. dns-admin.google.com. 1 21600 3600 1209600 300');
    });
  });

});
