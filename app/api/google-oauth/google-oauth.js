(function () {

  angular.module('xd.api.GoogleOauth', [])
    .factory('googleOAuth', GoogleOauth);

  function GoogleOauth($http, $window, $log) {
    var _token = '';
    var _isAuthenticated = false;
    var _profile;

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

    $http.get('/api/profile').then(
      function (resp) {
        _isAuthenticated = true;
        _token = resp.data.token;
        _profile = resp.data.profile;
      },
      function (err) {
        $log.error(err);
      }
    );

    return {
      token: function () {
        return _token;
      },
      profile: function () {
        return _profile;
      },
      isAuthenticated: function () {
        return _isAuthenticated;
      },
      login: login,
      logout: logout
    };
  }

})();