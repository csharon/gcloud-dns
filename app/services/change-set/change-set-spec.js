/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe.only('xd.services.ChangeSet', function () {

  var ChangeSet, records = [
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

  beforeEach(inject(function (_ChangeSet_) {
    ChangeSet = _ChangeSet_;
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

  });

  describe('additions', function () {
    var cs;
    beforeEach(function () {
      cs = new ChangeSet();
      cs.addToAdditions(records[0]);
    });

    it('should add an object to the additions collection when you call addToAdditions', function () {
      expect(cs.additions.items.length).to.equal(1);
    });

    it('should remove an object from the additions collection when you call removeFromAdditions', function () {
      cs.removeFromAdditions(records[0]);
      expect(cs.additions.items.length).to.equal(0);
    });

  });

  describe('deletions', function () {
    var cs;
    beforeEach(function () {
      cs = new ChangeSet();
      cs.addToDeletions(records[0]);
    });

    it('should add an object to the deletions collection when you call addToDeletions', function () {
      expect(cs.deletions.items.length).to.equal(1);
    });

    it('should remove an object from the deletions collection when you call removeFromDeletions', function () {
      cs.removeFromDeletions(records[0]);
      expect(cs.deletions.items.length).to.equal(0);
    });

  });

});
