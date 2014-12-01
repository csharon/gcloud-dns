/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.SOARRDataValue', function () {

  var SOARRDataValue,
    soaVal = 'ns-cloud-e1.googledomains.com. dns-admin.google.com. 5 21600 3600 1209600 300';

  beforeEach( module('xd.services.SOARRDataValue'));
  beforeEach(inject(function (_SOARRDataValue_) {
    SOARRDataValue = _SOARRDataValue_;
  }));

  describe('Constructor', function () {

    it('should have a default no argument constructor', function () {
      var soa = new SOARRDataValue();
      expect(soa.serial).to.equal(0);
    });

    it('should create an soa record from a string', function () {
      var soa = new SOARRDataValue(soaVal);
      expect(soa.serial).to.equal(5);
    });

  });

  describe('soa rrdata value toString', function () {

    it('should output a rrdata value as a string', function () {
      var soa = new SOARRDataValue(soaVal);
      expect(soa.toString()).to.equal(soaVal);
    });

  });


});
