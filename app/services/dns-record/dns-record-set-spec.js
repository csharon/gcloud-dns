/*jshint expr: true*/
(function () {
  describe('xd.services.DNSRecord', function () {

    var DNSRecordSet, rset = {
      name: 'taco.com.',
      type: 'A',
      ttl: 9600,
      rrdatas: [
        '1.2.3.4'
      ]
    };

    beforeEach( module('xd.services.DNSRecordSet'));

    beforeEach(inject(function (_DNSRecordSet_) {
      DNSRecordSet = _DNSRecordSet_;
    }));

    describe('Constructor', function () {

      it('should accept no arguments', function () {
        var rr = new DNSRecordSet();
        expect(rr instanceof DNSRecordSet).to.be.true;
        expect(rr.rrdatas.items.length).to.equal(0);
      });

      it('should accept a data object', function () {
        var rr = new DNSRecordSet(rset);
        expect(rr instanceof DNSRecordSet).to.be.true;
        expect(rr.name).to.equal('taco.com.');
      });

      it('should not populate the rrdata property', function () {
        var rr = new DNSRecordSet(rset);
        expect(rr.rrdatas.items.length).to.equal(0);
      });

    });

    describe('toJson', function () {

      it('should convert a DNSRecordSet to Json', function () {
        var rs = new DNSRecordSet(rset);
        expect(rs.toJson().name).to.equal('taco.com.');
      });

    });


  });

})();

