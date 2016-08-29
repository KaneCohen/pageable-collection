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
      calCol    = new Backbone.PageableCollection([a,b,c,d], {
        url: function() {
          return 'http://example.com';
        }
      });
      calObjCol = new Backbone.PageableCollection([a,b,c,d], {
        url: function() {
          return 'http://' + this.test + '.com';
        }
      });
      calObjCol.test = 'example';
    }

  });

  test("initial check and state sanity check", 13, function() {
    equal(col.getMode(), 'server');
    equal(col.hasPrevPage(), false);
    equal(col.getOffset(), 0);
    equal(col.state.currentPage, 1);
    equal(col.state.firstPage, 1);
    equal(col.state.lastPage, 0);

    col.setCurrentPage('2');
    equal(col.state.currentPage, 2);

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
    col.appendParams = false;
    var presenter = col.getPresenter();
    ok(new presenter(col) instanceof Backbone.View);
    col.length = 40;
    equal(new presenter(col).getMoreLink(), '<li class="page-more"><a href="?page=2" data-page="2">More</a></li>');
  });

  test("callable url", 2, function() {
    calCol.appendParams = false;
    var presenter = calCol.getPresenter();
    ok(new presenter(calCol) instanceof Backbone.View);
    calCol.length = 40;
    equal(new presenter(calCol).getMoreLink(), '<li class="page-more"><a href="http://example.com?page=2" data-page="2">More</a></li>');
  });

  test("callable url", 2, function() {
    calObjCol.appendParams = false;
    var presenter = calObjCol.getPresenter();
    ok(new presenter(calObjCol) instanceof Backbone.View);
    calObjCol.length = 40;
    equal(new presenter(calObjCol).getMoreLink(), '<li class="page-more"><a href="http://example.com?page=2" data-page="2">More</a></li>');
  });

  test("set state check", 2, function() {
    col.setState({total: 10});
    equal(col.state.total, 10);

    col.setState({total: 4});
    equal(col.state.total, 4);
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
