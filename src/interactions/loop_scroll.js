
Scoped.define("module:Interactions.Loopscroll", ["module:Interactions.Scroll"], function (Scroll, scoped) {
	return Scroll.extend({scoped: scoped}, function (inherited) {
		return {

		    constructor: function (element, options, data) {
		    	inherited.constructor.call(this, element, options);
				this.__top_white_space = this._whitespaceCreate();
				this.itemsElement().prepend(this.__top_white_space);
				this.__bottom_white_space = this._whitespaceCreate();
				this.itemsElement().append(this.__bottom_white_space);
		        this.reset(true);
		    },
		
		    _rotateFix: function () {
		    	var top_ws_height = this._whitespaceGetHeight(this.__top_white_space);
		    	var bottom_ws_height = this._whitespaceGetHeight(this.__bottom_white_space);
		    	var full_height = this.element().get(0).scrollHeight;
		    	var visible_height = this.element().innerHeight();
		    	var elements_height = full_height - top_ws_height - bottom_ws_height;
		    	var scroll_top = this.element().scrollTop();
		    	var count = this.itemsElement().children().length - 2;
		    	var top_elements = (scroll_top - top_ws_height) / elements_height * count; 
		    	var bottom_elements = (elements_height - (scroll_top - top_ws_height) - visible_height) / elements_height * count;
		    	if (top_elements < bottom_elements - 1) {
			    	while (top_elements < bottom_elements - 1) {
						var item = this.itemsElement().find(":nth-last-child(2)");
						item.insertAfter(this.__top_white_space);
						top_ws_height -= item.outerHeight();
		                this._whitespaceSetHeight(this.__top_white_space, top_ws_height);
						bottom_elements--;
						top_elements++;
			    	}
				} else if (bottom_elements < top_elements - 1) {
			    	while (bottom_elements < top_elements - 1) {
						var item2 = this.itemsElement().find(":nth-child(2)");
						item2.insertBefore(this.__bottom_white_space);
						top_ws_height += item2.outerHeight();
		                this._whitespaceSetHeight(this.__top_white_space, top_ws_height);
						bottom_elements++;
						top_elements--;
			    	}
		    	}
		    },
		    
		    _whitespaceFix: function () {
		        this._whitespaceSetHeight(this.__bottom_white_space, this.options().whitespace);
				var h = this._whitespaceGetHeight(this.__top_white_space);
		        this._whitespaceSetHeight(this.__top_white_space, this.options().whitespace);
				this.element().scrollTop(this.element().scrollTop() + this.options().whitespace - h);
		    },

			scrollToElement: function (element, options) {
				inherited.scrollToElement.call(this, element, options);
			},
		
		    reset: function (increment) {
		        this._whitespaceSetHeight(this.__bottom_white_space, this.options().whitespace);
		        this._whitespaceSetHeight(this.__top_white_space, this.options().whitespace);
		        this.element().scrollTop(this.options().whitespace + (increment ? this.element().scrollTop() : 0));
		    }
		
		};
	});
});


Scoped.define("module:Interactions.LoopscrollStates.Idle", ["module:Interactions.ScrollStates.Idle"], function (State, scoped) {
   	return State.extend({scoped: scoped}, {});
});


Scoped.define("module:Interactions.LoopscrollStates.Scrolling", ["module:Interactions.ScrollStates.Scrolling"], function (State, scoped) {
   	return State.extend({scoped: scoped}, {

   		_scroll: function () {
   			this.parent()._rotateFix();
   		},
   		
   		_scrollend: function () {
   			this.parent()._whitespaceFix();
   		}
   		
   	});
});


Scoped.define("module:Interactions.LoopscrollStates.ScrollingTo", ["module:Interactions.ScrollStates.ScrollingTo"], function (State, scoped) {
   	return State.extend({scoped: scoped}, {

   		_scroll: function () {
   			this.parent()._rotateFix();
   		},
   		
   		_scrollend: function () {
   			this.parent()._whitespaceFix();
   		}
   		
   	});
});
