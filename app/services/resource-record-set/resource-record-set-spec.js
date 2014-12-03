/*jshint expr: true*/
describe('xd.services.ResourceRecordSet', function () {

  var ResourceRecordSet, RRDataValue, rset;
  beforeEach(module('xd.services.ResourceRecordSet'));

  beforeEach(inject(function (_ResourceRecordSet_, _RRDataValue_) {
    ResourceRecordSet = _ResourceRecordSet_;
    RRDataValue = _RRDataValue_;
    rset = {
      name: 'taco.com.',
      type: 'A',
      ttl: 9600,
      rrdatas: [
        '1.2.3.4'
      ]
    };
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

  describe('rrdata values', function () {
    it('should contain an array of RRDataValues', function () {
      var rs = new ResourceRecordSet(rset);
      var item = rs.rrdatas.items[0];
      expect(item instanceof RRDataValue).to.be.true;
      expect(item.toString()).to.equal('1.2.3.4');
    });
  });


});
