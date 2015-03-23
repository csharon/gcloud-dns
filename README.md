Google Cloud DNS Editor
=============================
####Overview
The Google Cloud DNS Editor is a GUI for managing your DNS Zones using the [Google Cloud Platform API](https://cloud.google.com/dns/api/v1beta1/).
See it in action: [GCloud DNS Editor](http://gclouddns.xdoji.com/)

####Requirements
* NodeJS
* Bower

####Installation
```
npm install
bower install
```

####Gulp Tasks
```
gulp dev  #Development - builds application, runs express server, watches for changes

gulp tdd  #TDD - Test Driven Development, automatically runs mocha units tests as you edit files.

gulp test #Test - Run mocha unit tests using PhantomJS and exits

```
#### Technologies Used
* Client
  * [Angular JS](https://angularjs.org/)
  * [Angular Material](https://material.angularjs.org/)
  * [Bootstrap](http://getbootstrap.com/)
  * [Restangular](https://github.com/mgonto/restangular)
  * [Angular UI Router](https://github.com/angular-ui/ui-router)
  * [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
* Server
  * [Node JS](http://nodejs.org/)
  * [Express](http://expressjs.com/)
* Build Tools
  * [Bower](http://bower.io/)
  * [Jade](http://jade-lang.com/)
  * [Gulp](gulpjs.com)
  * [Sass](http://sass-lang.com/)
  * [Compass](http://compass-style.org/)
* Testing
  * [Karma](https://github.com/karma-runner/karma)
  * [Mocha](http://visionmedia.github.io/mocha/)
  * [Chai](http://chaijs.com/)
