/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.SOADataValue', function () {

  var SOADataValue,
    soaVal = 'ns-cloud-e1.googledomains.com. dns-admin.google.com. 5 21600 3600 1209600 300';

  beforeEach( module('xd.services.SOADataValue'));
  beforeEach(inject(function (_SOADataValue_) {
    SOADataValue = _SOADataValue_;
  }));

  describe('Constructor', function () {

    it('should have a default no argument constructor', function () {
      var soa = new SOADataValue();
      expect(soa.serial).to.equal(0);
    });

    it('should create an soa record from a string', function () {
      var soa = new SOADataValue(soaVal);
      expect(soa.serial).to.equal(5);
    });

  });

  describe('soa rrdata value toString', function () {

    it('should output a rrdata value as a string', function () {
      var soa = new SOADataValue(soaVal);
      expect(soa.toString()).to.equal(soaVal);
    });

  });


});
