(function () {

  /**
   * @ngdoc service
   * @name xd.services.ArrayCollection:arrayCollection
   *
   */
  angular.module('xd.services.ArrayCollection', [])
    .factory('ArrayCollection', buildCollection);

  function buildCollection() {

    function ArrayCollection(items) {
      this.items = _.isArray(items) ? items : [];
    }

    ArrayCollection.prototype.getItem = getItem;
    ArrayCollection.prototype.addItem = addItem;
    ArrayCollection.prototype.removeItem = removeItem;
    ArrayCollection.prototype.containsItem = containsItem;
    ArrayCollection.prototype.updateItem = updateItem;


    function getItem(item) {
      return _.find(this.items, function (listItem) {
        return matches(listItem, item);
      });
    }

    function addItem(item) {
      if (!this.containsItem(item)) {
        this.items.push(item);
      }
    }

    function updateItem(original, updated) {
      // find the original in the list
      this.removeItem(original);
      this.addItem(updated);

    }

    function removeItem(item) {
      _.remove(this.items, function (listItem) {
        return matches(listItem, item);
      });
    }

    function containsItem(item) {
      return _.some(this.items, function (listItem) {
        return matches(listItem, item);
      });
    }

    function matches(listItem, item) {
      var found = true;
      _.forIn(item, function (value, key) {
        if (_.isArray(value)) {
          compareArrays(listItem[key], item[key]);
        } else {
          found = found && listItem[key] === item[key];
        }
      });
      return found;
    }

    function compareArrays(arr1, arr2) {
      if (arr1.length === arr2.length) {
        return _.every(arr1, function (item) {
          return _.contains(arr2, item);
        });
      }
      return false;

    }

    return ArrayCollection;
  }

})();
