/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe.only('xd.services.ManagedZone', function () {
  var ManagedZone,
    zone = {
      name: 'meat-zone',
      dnsName: 'meat.com.',
      description: 'This is some Meat.',
      id: 234234234,
      nameServers: ['ns1.meat.com','ns2.meat.com'],
      creationTime: '2014-11-12'
    };

  beforeEach( module('xd.services.ManagedZone'));

  beforeEach(inject(function (_ManagedZone_) {
    ManagedZone = _ManagedZone_;
  }));


  describe('ManagedZone Constructor', function () {

    it('should should have a valid no argument constructor', function () {
      var mz = new ManagedZone();
      expect(mz.kind).to.equal('dns#managedZone');
      expect(mz.records.items.length).to.equal(0);
    });

    it('should create ManagedZone from a data object', function () {
      var mz = new ManagedZone(zone);
      expect(mz.name).to.equal('meat-zone');
      expect(mz.records.items.length).to.equal(0);
    });

  });

  describe('toManagedZoneJson', function () {
    it('should convert a managedZone to Json', function () {
      var mz = new ManagedZone(zone);
      expect(mz.toManagedZoneJson().name).to.equal('meat-zone');
    });

  });




});
