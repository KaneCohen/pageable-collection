# Pageable Collection for Backbone

Inspired by [backbone-pageable](https://github.com/wyuenho/backbone-pageable), simple pagination replacement for Backbone.Collection.

Nothing too special, i'd recommend checking source code for more details, but all in all, this is just a
normal Collection with extra functions that you can use to fetch required paginated data from the server and
render simple pagination links whenever you want.

Comes with a reasonable defaults which would allow you to use Pageable Collection from the get go with
only several lines of extra backend code.

## How to use

1. Add link after backbone:

````javascript
<script src="pageable-collection.min.js"></script>
````

2. Back end setup:

Pageable Collection accepts 3 types of responses from the server.
a) JSON response with state and items.

````js
{
	state: {
		total: 30 // Set total available items.
	},
	items: []   // Array of models.
}
````

b) JSON response with models. Suited towards bassic pagination, when you provide
perPage + 1 items where extra item is an indicator that next page is available.

````js
[{id: 1, title: 'Foo'}, {id: 2, title: 'Bar'}]   // Array of models.
````

c) JSON response with models + HTTP headers with state data.

````js
[{id: 1, title: 'Foo'}, {id: 2, title: 'Bar'}]   // Array of models.
````
Available Headers are: `X-Total`, `X-PerPage`, `X-CurrentPage`.

3. Use instead of default Backbone.Collection:

````javascript
var UsersCollection = Backbone.PageableCollection.extend({
	url: 'http://example.com/users'
});
var users = new UsersCollection;
// Get first users page.
users.fetchPage(1, {reset: true});
users.on('reset', this.render, this);

// In render method
render: function(collection) {
	// Loop through all of the models in collection.
	// This is fine only for server mode where backed returns state
	// with total items. Or if you're ok with perPage + 1 items on basic pagination mode.
	collection.each(function(model) {

	});
	// Get only items at current page. Recommended for client mode and
	// basic server pagination mode.
	collection.getItems().each(function(item) {

	});
	// Render paginator. **links** methood picks paginator automatically based on state.
	this.$el.append(collection.links());
}
````

That's it for now. I'll be adding better readme in the future, for now read code.
