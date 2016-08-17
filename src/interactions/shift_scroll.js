Scoped.define("module:Interactions.Shiftscroll", [
	"module:Interactions.Scroll",
	"base:Async"
], function (Scroll, Async, scoped) {
	return Scroll.extend({scoped: scoped}, function (inherited) {
		return {

			constructor: function () {
		    	inherited.constructor.apply(this, arguments);		    			    
				this.__bottom_white_space = this._whitespaceCreate();
				this.itemsElement().append(this.__bottom_white_space);
				this._whitespaceFix();
				Async.eventually(this._whitespaceFix, this);
		    },
		    
		    _whitespaceFix: function () {
		    	var boxHeight = this.element().innerHeight();
		    	var itemHeight = this.itemsElement().find(":nth-child(1)").outerHeight();
				this._whitespaceSetHeight(this.__bottom_white_space, boxHeight - itemHeight);
		    }
		    		
		};
	});
});