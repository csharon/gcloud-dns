/*jshint expr: true*/
(function () {

  describe('xd.services.MXDataValue', function () {

    var MXDataValue, mxdata = '10 mx.taco.com.';

    beforeEach(module('xd.services.MXDataValue'));

    beforeEach(inject(function (_MXDataValue_) {
      MXDataValue = _MXDataValue_;
    }));

    describe('Constructor', function () {

      it('should accept no arguments', function () {
        var mx = new MXDataValue();
        expect(mx instanceof MXDataValue).to.be.true;
        expect(mx.priority).to.equal(0);
        expect(mx.server).to.equal('mailServer');
      });

      it('should accept a data value', function () {
        var mx = new MXDataValue(mxdata);
        expect(mx instanceof MXDataValue).to.be.true;
      });

    });

    describe('mxdata.toString', function () {
      it('should create assembled rrdata string', function () {
        var mx = new MXDataValue(mxdata);
        expect(mx.toString()).to.equal('10 mx.taco.com.');

      });
    });

    describe('mxdata.fromString', function () {
      it('should parse an mx rrdata sting into server and priority properties', function () {
        var mx = new MXDataValue(mxdata);
        expect(mx.priority).to.equal(10);
        expect(mx.server).to.equal('mx.taco.com.');
      });

    });

  });

})();
