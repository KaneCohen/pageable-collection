(function() {

  var collection = new Backbone.PageableCollection();
  collection.setState({total: 50});

  $('.simple-pager').html(collection.links().el);

  var collection2 = new Backbone.PageableCollection([], {showPerPageSelector: true});
  collection2.setState({total: 50});
  $('.pager-with-display').html(collection2.links().el);

})();
