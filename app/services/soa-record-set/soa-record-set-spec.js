/*jshint expr: true*/

(function () {
  describe('xd.services.SOARecordSet', function () {

    var SOADataValue, SOARecordSet, soaRecord = {
      name: 'taco.com.',
      type: 'SOA',
      ttl: 9600,
      rrdatas: ['ns-cloud-e1.googledomains.com. dns-admin.google.com. 5 21600 3600 1209600 300']
    };

    beforeEach( module('xd.services.SOARecordSet'));

    beforeEach(inject(function (_SOARecordSet_, _SOADataValue_) {
      SOARecordSet = _SOARecordSet_;
      SOADataValue = _SOADataValue_;

    }));

    describe('Constructor', function () {
      it('should accept no arguments', function () {
        var soa = new SOARecordSet();
        expect(soa instanceof SOARecordSet).to.be.true;
        expect(soa.rrdatas.items.length).to.equal(1);
      });

      it('should accept a data object', function () {
        var soa = new SOARecordSet(soaRecord);
        expect(soa instanceof SOARecordSet).to.be.true;
        expect(soa.rrdatas.items.length).to.equal(1);
        expect(soa.rrdatas.items[0] instanceof SOADataValue);
      });

    });

    describe('getNext', function () {
      it('should return a new SOA record with an incremented serial number', function () {
        var soa = new SOARecordSet(soaRecord);
        expect(soa.rrdatas.items[0].serial).to.equal(5);
        var next = soa.getNext();
        expect(next.rrdatas.items[0].serial).to.equal(6);
      });
      it('should return a new SOA record with an incremented serial number', function () {
        var soa = new SOARecordSet();
        expect(soa.rrdatas.items[0].serial).to.equal(0);
        var next = soa.getNext();
        expect(next.rrdatas.items[0].serial).to.equal(1);
      });
    });

  });


})();
