var rootPath = process.env.PWD = process.cwd();

console.log('App rootPath: ' + rootPath);
console.log('Dev webRoot: ' + rootPath.concat('/dev'));
console.log('Prod webRoot: ' + rootPath.concat('/public'));

module.exports = {
  development: {
    rootPath: rootPath,
    port: process.env.PORT || 3000,
    webRoot: rootPath.concat('/dev'),
    google: {
      clientID: '795904425230-4lk581rn4rbapi8hconn8fl20fink2cu.apps.googleusercontent.com',
      clientSecret: 'wLhMSxr-WIkDcR9jZPXhJtDG',
      callbackURL: 'http://localhost:3000/oauth2callback',
      scope: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
        'https://www.googleapis.com/auth/cloud-platform'
      ]
    }
  },

  production: {
    rootPath: rootPath,
    port: process.env.PORT || 3000,
    webRoot: rootPath.concat('/public')
  }
};
