/*globals inject, beforeEach, describe, it, expect, module*/
/*jshint expr: true*/
(function () {
  describe('xd.services.DNSRecordFactory', function () {

    var DNSRecordFactory,
      ResourceRecordSet,
      SOARecordSet,
      RRDataValue,
      SOARRDataValue,
      MXRecordSet,
      MXRRDataValue,
      aRecord = {
        name: 'taco.com.',
        type: 'A',
        ttl: 9600,
        rrdatas: [
          '1.2.3.4'
        ]
      },
      soaRecord = {
        name: 'taco.com.',
        type: 'SOA',
        ttl: 21600,
        rrdatas: [
          'ns-cloud-e1.googledomains.com. dns-admin.google.com. 5 21600 3600 1209600 300'
        ]
      },
      mxRecord = {
        name: 'taco.com.',
        type: 'MX',
        ttl: 21600,
        rrdatas: [
          '10 mail.taco.com.'
        ]
      };
    beforeEach(module('xd.services.DNSRecordFactory'));
    beforeEach(inject(function (_DNSRecordFactory_, _ResourceRecordSet_, _RRDataValue_, _SOARecordSet_, _SOARRDataValue_, _MXRecordSet_, _MXRRDataValue_) {
      DNSRecordFactory = _DNSRecordFactory_;
      ResourceRecordSet = _ResourceRecordSet_;
      RRDataValue = _RRDataValue_;
      SOARecordSet = _SOARecordSet_;
      SOARRDataValue = _SOARRDataValue_;
      MXRecordSet = _MXRecordSet_;
      MXRRDataValue = _MXRRDataValue_;
    }));

    describe('createDNSRecord', function () {
      describe('ResourceRecordSet', function () {

        it('should create a ResourceRecordSet when no arguments are supplied', function () {
          var record = DNSRecordFactory.createDNSRecord();
          expect(record instanceof ResourceRecordSet).to.be.true;
        });

        it('should create a ResourceRecordSet when arguments are supplied', function () {
          var record = DNSRecordFactory.createDNSRecord(aRecord);
          expect(record instanceof ResourceRecordSet).to.be.true;
          expect(record.rrdatas.items[0] instanceof RRDataValue).to.be.true;
          expect(record.rrdatas.items[0].toString()).to.equal('1.2.3.4');
        });
      });

      describe('SOARecordSet', function () {

        it('should create a SOARecordSet when called with type=SOA', function () {
          var record = DNSRecordFactory.createDNSRecord(soaRecord);
          expect(record instanceof SOARecordSet).to.be.true;
          expect(record.rrdatas.items[0] instanceof SOARRDataValue).to.be.true;
          expect(record.rrdatas.items[0].toString()).to.equal('ns-cloud-e1.googledomains.com. dns-admin.google.com. 5 21600 3600 1209600 300');
        });
      });

      describe('MXRecordSet', function () {

        it('should create a MXRecordSet when called with type=MX', function () {
          var record = DNSRecordFactory.createDNSRecord(mxRecord);
          expect(record instanceof MXRecordSet).to.be.true;
          expect(record.rrdatas.items[0] instanceof MXRRDataValue).to.be.true;
          expect(record.rrdatas.items[0].toString()).to.equal('10 mail.taco.com.');
        });
      });

    });


  });

})();

