/*global toastr*/
(function () {

  angular.module('xd.services.XdToastr', [])
    .value('toastr', toastr)
    .factory('xdToastr', XdToastr);

  /* @ngInject */
  function XdToastr(toastr) {
    toastr.options.closeButton = true;
    return {
      success: function (msg, title) {
        toastr.success(msg, title);
      },
      error: function (msg, title) {
        toastr.error(msg, title);
      },
      warn: function (msg, title) {
        toastr.warning(msg, title);
      }
    };
  }


})();
