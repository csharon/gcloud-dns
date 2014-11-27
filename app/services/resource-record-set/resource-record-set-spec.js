/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
describe('xd.services.ResourceRecordSet', function () {

  var ResourceRecordSet,
    rset = {
      name: 'taco.com.',
      type: 'A',
      ttl: 9600,
      rrdatas: [
        '1.2.3.4'
      ]
    };
  beforeEach(module('xd.services.ResourceRecordSet'));

  beforeEach(inject(function (_ResourceRecordSet_) {
    ResourceRecordSet = _ResourceRecordSet_;
  }));

  describe('Constructor', function () {

    it('should accept no arguments', function () {
      var rr = new ResourceRecordSet();
      expect(rr.kind).to.equal('dns#resourceRecordSet');
      expect(rr.rrdatas.items.length).to.equal(0);
    });

    it('should accept a data object', function () {
      var rr = new ResourceRecordSet(rset);
      expect(rr.name).to.equal('taco.com.');
      expect(rr.rrdatas.items.length).to.equal(1);
    });
  });

  describe('toJson', function () {
    it('should convert a ResourceRecordSet to Json', function () {
      var rs = new ResourceRecordSet(rset);
      expect(rs.toJson().name).to.equal('taco.com.');
    });

  });

});
