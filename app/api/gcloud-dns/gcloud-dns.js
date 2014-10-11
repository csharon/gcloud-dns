/*jshint camelcase: false*/
(function () {
  var GcloudDnsConfig = {
    BASE_URL: 'https://www.googleapis.com/dns/v1beta1',
    RESOURCE_NAME: 'projects'
  };

  /**
  * @ngdoc object
  * @name xd.api.GcloudDns
  * @description
  * GCloud Dns Api
  *
  */
  angular.module('xd.api.GcloudDns', ['restangular'])
    .constant('GcloudDnsConfig', GcloudDnsConfig)
    .factory('gcloudDns', GcloudDns);

  /* @ngInject */
  function GcloudDns(Restangular, GcloudDnsConfig) {
    var _project,
      _token,
      _resource;

    function initResource(projectName) {
      _resource = Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(GcloudDnsConfig.BASE_URL);
        RestangularConfigurer.setDefaultRequestParams({access_token: getToken()});
        RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
        RestangularConfigurer.setFullRequestInterceptor(function (element, operation, route, url, headers, params) {
          if (operation === 'remove') {
            element = null;
          }
          return {
            headers: headers,
            params: params,
            element: element,
            httpConfig: {}
          };
        });
      });
      _resource.addResponseInterceptor(function (data, operation, what) {
        if (operation === 'getList' && what === 'managedZones') {
          return data.managedZones;
        } else if (operation === 'getList' && what === 'rrsets') {
          return data.rrsets;
        }
        return data;
      });

      _project = _resource.one('projects', projectName);
    }

    function getProject() {
      return _project;
    }

    function setProject(name) {

      initResource(name);
    }

    function getToken() {
      return _token;
    }

    function setToken(token) {
      _token = token;
    }

    //Public API
    return {
      /**
       *
       * @returns {*} Restangular Project Resource
       */
      getProject: getProject,
      /**
       *
       * @param {String} name Google Project ID
       */
      setProject: setProject,
      /**
       *
       * @param {String} token Google OAuth2 token
       */
      setToken: setToken
    };
  }

})();