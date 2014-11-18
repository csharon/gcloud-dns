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
  angular.module('xd.api.GcloudDns', ['restangular', 'xd.api.GoogleOauth'])
    .constant('GcloudDnsConfig', GcloudDnsConfig)
    .factory('gcloudDns', GcloudDns);

  /* @ngInject */
  function GcloudDns($q, Restangular, GcloudDnsConfig, googleOAuth) {

    var api = {};
    api.getProject = getProject;
    api.setProject = setProject;
    api.setToken = setToken;

    var _project,
      _token,
      _resource;

    var deferred = $q.defer();
    var _projectPromise = deferred.promise;

    function initResource(projectName) {
      _resource = Restangular.withConfig(configureRestangular);
      _resource.addResponseInterceptor(interceptResponse);
      _project = _resource.one('projects', projectName);
      _resource.extendModel('rrsets', function (model) {
        model = _.extend(new xd.dns.vo.ResourceRecord(), model);
        return model;
      });
      deferred.resolve(_project);
    }

    function configureRestangular(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(GcloudDnsConfig.BASE_URL);
      RestangularConfigurer.setDefaultRequestParams({access_token: getToken()});
      RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
      RestangularConfigurer.setFullRequestInterceptor(interceptRequest);
    }

    function interceptRequest(element, operation, route, url, headers, params) {
      if (operation === 'remove') {
        element = null;
      }
      return {
        headers: headers,
        params: params,
        element: element,
        httpConfig: {}
      };
    }

    function interceptResponse(data, operation, what, url, response, deferred) {
      if (response.status === 401) {
        googleOAuth.logout();
        return deferred.reject('Session Timout');
      }
      if (operation === 'getList' && what === 'managedZones') {
        return data.managedZones;
      } else if (operation === 'getList' && what === 'rrsets') {
        return data.rrsets;
      }
      return data;
    }

    function getProject() {
      return _projectPromise;
    }

    function setProject(name) {
      deferred = $q.defer();
      _projectPromise = deferred.promise;

      initResource(name);
      return _projectPromise;

    }

    function getToken() {
      return _token;
    }

    function setToken(token) {
      _token = token;
    }

    //Public API
    return api;
  }

})();
