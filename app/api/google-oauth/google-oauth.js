(function () {

  angular.module('xd.api.GoogleOauth', [])
    .factory('googleOAuth', GoogleOauth);

  /* @ngInject */
  function GoogleOauth($http, $window, $q) {
    var api = {};
    api.token = '';
    api.profile = {};
    api.isAuthenticated = false;
    api.login = login;
    api.logout = logout;
    api.loadProfile = loadProfile;

    function login() {
      $window.location.assign('/auth/google');
    }

    function logout() {
      $http['delete']('/api/session').then(
        function () {
          $window.location.replace('/');
        }

      );
    }

    function loadProfile() {
      return $http.get('/api/profile').then(
        function (resp) {
          api.isAuthenticated = true;
          api.token = resp.data.token;
          api.profile = resp.data.profile;
          return resp.data;
        },
        function (err) {
          return $q.reject(err);
        }
      );
    }

    return api;
  }

})();
