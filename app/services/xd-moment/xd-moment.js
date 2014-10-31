/*global moment*/
(function () {

  angular.module('xd.wrappers.moment', [])
    .value('xdMoment', moment)
    .filter('moment', momentFilter);

  /* @ngInject */
  function momentFilter(xdMoment) {
    return function (aDate, formatString) {
      var dateFormat = formatString || 'MM/DD/YYYY';
      if (angular.isDate(aDate)) {
        return xdMoment(aDate).format(dateFormat);
      } else if (angular.isString(aDate)) {
        return xdMoment(aDate).isValid() ? xdMoment(aDate).format(dateFormat) : '';
      }

      return '';
    };
  }

})();
