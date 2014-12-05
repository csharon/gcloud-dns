/*jshint expr: true*/

(function () {

  describe('xd.services.MXRecordSet', function () {

    var MXRecordSet, MXDataValue, mxRecord = {
      name: 'taco.com.',
      type: 'MX',
      ttl: 9600,
      rrdatas: ['10 mx.taco.com.']
    };

    beforeEach( module('xd.services.MXRecordSet'));

    beforeEach(inject(function (_MXRecordSet_, _MXDataValue_) {
      MXRecordSet = _MXRecordSet_;
      MXDataValue = _MXDataValue_;

    }));

    describe('Constructor', function () {
      it('should accept no arguments', function () {
        var mx = new MXRecordSet();
        expect(mx instanceof MXRecordSet).to.be.true;
        expect(mx.rrdatas.items.length).to.equal(1);
      });

      it('should accept a data object', function () {
        var mx = new MXRecordSet(mxRecord);
        expect(mx instanceof MXRecordSet).to.be.true;
        expect(mx.rrdatas.items.length).to.equal(1);
        expect(mx.rrdatas.items[0].priority).to.equal(10);
      });

    });

  });


})();

