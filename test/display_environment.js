(function() {

  var collection = new Backbone.PageableCollection();
  collection.setState({total: 50});

  $('.simple-pager').html(collection.links().el);

  var collection2 = new Backbone.PageableCollection([], {url: 'data.json', linkUrl: 'view.html', showPerPageSelector: true});
  collection2.on('reset', function() {
    $('.pager-with-display').html(collection2.links().el);
  });
  collection2.setState({total: 50});
  collection2.reset();

})();
