(function () {

  /**
   * @ngdoc service
   * @name xd.services.ProjectModel:projectModel
   *
   */
  angular.module('xd.services.ProjectModel', ['xd.services.LocalStorage'])
    .factory('projectModel', ProjectModel);

  /* @ngInject */
  function ProjectModel(localStorage, $q) {
    var model = {},
      STORAGE_KEY = 'projects';

    model.projects = [];
    model.project = '';
    model.load = loadProjects;
    model.saveProject = saveProject;

    function loadProjects() {
      return localStorage.getItem(STORAGE_KEY).then(
        function (projects) {
          model.projects = projects;
          return projects;
        },
        function (err) {
          model.projects = [];
          localStorage.save(STORAGE_KEY, model.projects);
          return $q.reject(err);
        }
      );
    }

    function saveProject(project) {
      if (!_.contains(model.projects, project)) {
        model.projects.push(project);
        localStorage.save(STORAGE_KEY, model.projects);
      }
    }

    return model;
  }

})();
