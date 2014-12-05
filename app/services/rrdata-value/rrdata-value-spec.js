/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.RRDataValue', function () {

  var RRDataValue,
    rrVal = '127.0.0.1';

  beforeEach( module('xd.services.RRDataValue'));
  beforeEach(inject(function (_RRDataValue_) {
    RRDataValue = _RRDataValue_;
  }));

  describe('Constructor', function () {

    it('should have a default no argument constructor', function () {
      var data = new RRDataValue();
      expect(data.rrdata).to.equal('');
    });

    it('should create a RRDataValue from a string', function () {
      var data = new RRDataValue(rrVal);
      expect(data.rrdata).to.equal('127.0.0.1');
    });

    it('should create a RRDataValue from a any input', function () {
      var data = new RRDataValue(5);
      expect(data.rrdata).to.equal('');
    });

  });

  describe('RRDataValue toString', function () {

    it('should output a rrdata value as a string', function () {
      var data = new RRDataValue(rrVal);
      expect(data.toString()).to.equal(rrVal);
    });

  });


});
