(function() {

  var a, b, c, d, e, col, otherCol;

  module("Backbone.PageableCollection", {

    setup: function() {
      a         = new Backbone.Model({id: 3, label: 'a'});
      b         = new Backbone.Model({id: 2, label: 'b'});
      c         = new Backbone.Model({id: 1, label: 'c'});
      d         = new Backbone.Model({id: 0, label: 'd'});
      e         = null;
      col       = new Backbone.PageableCollection([a,b,c,d]);
      otherCol  = new Backbone.PageableCollection();
    }

  });

  test("initial check and state sanity check", 12, function() {
    equal(col.getMode(), 'server');
    equal(col.hasPrevPage(), false);
    equal(col.getOffset(), 0);
    equal(col.state.currentPage, 1);
    equal(col.state.firstPage, 1);
    equal(col.state.lastPage, 0);

		col.setCurrentPage(2);
		col.setMode('client');
    equal(col.getMode(), 'client');
    equal(col.hasPrevPage(), true);
    equal(col.getOffset(), 20);
    equal(col.state.currentPage, 2);
    equal(col.state.firstPage, 1);
    equal(col.state.lastPage, 0);
  });

  test("presenter", 2, function() {
    ok(col.getPresenter() instanceof Backbone.View);
		col.length = 40;
		equal(col.getPresenter().getMoreLink(), '<li class="page-next page-more"><a href="?page=2" data-page="2">More</a></li>');
	});

  test("extend options", 1, function() {
		var nc = new (Backbone.PageableCollection.extend({
			state: {
				perPage: 10
			}
		}));
		deepEqual(nc.state, {
			currentPage: 1,
			firstPage:   1,
			lastPage:    0,
			perPage:     10,
			total:       0
		});
	});

})();
