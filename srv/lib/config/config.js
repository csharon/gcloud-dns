var rootPath = process.env.PWD = process.cwd();

module.exports = {
  development: {
    rootPath: rootPath,
    port: process.env.PORT || 3005,
    webRoot: [
      './app/',
      './',
      './.tmp/'
    ],
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
    webRoot: [rootPath.concat('/build')],
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
  }
};
