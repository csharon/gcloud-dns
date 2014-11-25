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
        this.additions = _.isArray(data.additions) ? new ArrayCollection(data.additions) : new ArrayCollection();
        this.deletions = _.isArray(data.deletions) ? new ArrayCollection(data.deletions) : new ArrayCollection();
      } else {
        this.additions = new ArrayCollection();
        this.deletions = new ArrayCollection();
      }

    }

    ChangeSet.prototype.toChangeSetJson = toChangeSetJson;
    ChangeSet.prototype.hasChanges = hasChanges;
    ChangeSet.prototype.addToAdditions = addToAdditions;
    ChangeSet.prototype.removeFromAdditions = removeFromAdditions;
    ChangeSet.prototype.addToDeletions = addToDeletions;
    ChangeSet.prototype.removeFromDeletions = removeFromDeletions;

    function toChangeSetJson() {
      return {
        additions: this.additions.items,
        deletions: this.deletions.items
      };
    }

    function addToAdditions(item) {
      this.additions.addItem(item);
    }

    function removeFromAdditions(item) {
      this.additions.removeItem(item);
    }

    function addToDeletions(item) {
      this.deletions.addItem(item);
    }

    function removeFromDeletions(item) {
      this.deletions.removeItem(item);
    }

    function hasChanges() {
      return (this.additions.length > 0 || this.deletions.length > 0);
    }

    return ChangeSet;
  }

})();
