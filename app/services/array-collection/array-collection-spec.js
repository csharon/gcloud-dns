/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ArrayCollection', function () {

  var ArrayCollection, ac,
    records = [
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
    ],
    aRecord = {
      name: 'www.taco.com.',
      type: 'A',
      ttl: 21600,
      rrdatas: [
        '192.168.1.1'
      ]},
    updatedSOA = {
      name: 'taco.com.',
      type: 'SOA',
      ttl: 8600,
      rrdatas: [
        'ns-cloud-b1.googledomains.com. dns-admin.google.com. 0 21600 3600 1209600 300'
      ]
    };
  beforeEach( module('xd.services.ArrayCollection'));

  beforeEach(inject(function (_ArrayCollection_) {
    ArrayCollection = _ArrayCollection_;

  }));

  describe('constructor function', function () {

    it('should create a new ArrayCollection when created without an array', function () {
      ac = new ArrayCollection();
      expect(angular.isFunction(ac.addItem)).to.be.true;
    });

    it('should have an empty list property', function () {
      ac = new ArrayCollection();
      expect(ac.items.length).to.equal(0);
    });

    it('should populate the items array if an array is passed in', function () {
      ac = new ArrayCollection(records);
      expect(ac.items.length).to.equal(2);
    });

  });

  describe('addItem', function () {

    it('should add an item to the list', function () {
      ac = new ArrayCollection(angular.copy(records));
      ac.addItem(aRecord);
      expect(ac.items.length).to.equal(3);
    });
    it('should add not add an item to the list, if it exists', function () {
      ac = new ArrayCollection(angular.copy(records));
      ac.addItem(records[0]);
      expect(ac.items.length).to.equal(2);
    });

  });

  describe('removeItem', function () {
    it('should remove an item from the list', function () {
      ac = new ArrayCollection(angular.copy(records));
      ac.removeItem(records[0]);
      expect(ac.items.length).to.equal(1);
    });
  });

  describe('containsItem', function () {
    it('should return true if the list contains the item', function () {
      ac = new ArrayCollection(angular.copy(records));
      expect(ac.containsItem(records[0])).to.be.true;
      expect(ac.containsItem(records[1])).to.be.true;
    });

    it('should handle an array of strings', function () {
      ac = new ArrayCollection(['corn', 'pork', 'beef']);
      expect(ac.containsItem('pork')).to.be.true;
    });
  });

  describe('getItem', function () {
    it('should return the item if the list contains the item', function () {
      ac = new ArrayCollection(angular.copy(records));
      var record = angular.copy(records[0]);
      var item = ac.getItem(record);
      expect(record).to.deep.equal(item);
    });
  });

  describe('updateItem', function () {
    it('should update an item in the list', function () {
      ac = new ArrayCollection(angular.copy(records));
      ac.updateItem(ac.items[1], updatedSOA);
      expect(ac.items.length).to.equal(2);
      expect(ac.items[1].ttl).to.equal(8600);
    });
  });

});
