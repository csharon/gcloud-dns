(function () {

  /**
   * @ngdoc service
   * @name xd.services.ChangeSet:changeSet
   *
   */
  angular.module('xd.services.ChangeSet', ['xd.services.ArrayCollection'])
    .factory('ChangeSet', wrapper);

  /* @ngInject */
  function wrapper(ArrayCollection) {

    function ChangeSet(data) {
      if (!_.isUndefined(data)) {
        this.id = data.id || '';
        this.startTime = data.startTime || '';
        this.status = data.status || '';
        this.additions = _.isArray(data.additions) ? new ArrayCollection(data.additions) : new ArrayCollection();
        this.deletions = _.isArray(data.deletions) ? new ArrayCollection(data.deletions) : new ArrayCollection();
      } else {
        this.id = '';
        this.startTime = '';
        this.status = '';
        this.additions = new ArrayCollection();
        this.deletions = new ArrayCollection();
      }

    }

    ChangeSet.prototype.kind = 'dns#change';
    ChangeSet.prototype.toJson = toJson;
    ChangeSet.prototype.hasChanges = hasChanges;
    ChangeSet.prototype.addTo = addTo;
    ChangeSet.prototype.removeFrom = removeFrom;
    ChangeSet.prototype.updateItem = updateItem;

    function toJson() {
      return {
        additions: _.map(this.additions.items, function (item) { return item.toJson(); }),
        deletions: _.map(this.deletions.items, function (item) { return item.toJson(); })
      };
    }

    function addTo(item, collection) {
      this[collection].addItem(item);
    }

    function updateItem(original, updated, collection) {
      this[collection].updateItem(original, updated);
    }

    function removeFrom(item, collection) {
      this[collection].removeItem(item);
    }

    function hasChanges() {
      return (this.additions.length > 0 || this.deletions.length > 0);
    }

    return ChangeSet;
  }

})();
