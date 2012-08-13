$.fn.passThrough = function (targets) {
	if (this.length) {
		if ('pointerEvents' in this.get(0).style) {
			this.css({'pointer-events': 'none', 'user-select': 'none', 'touch-callout': 'none'});
		} else {
			// Polyfill
			this.bind('click tap mousedown mouseup mouseenter mouseleave', function passThrough (e) {
				$(targets).each(function() {
					// check if clicked point (taken from event) is inside element
					var mouseX = e.pageX;
					var mouseY = e.pageY;
					var offset = $(this).offset();
					var width = $(this).width();
					var height = $(this).height();
					
					if (mouseX > offset.left && mouseX < offset.left+width &&
						mouseY > offset.top && mouseY < offset.top+height) {
							$(this).trigger(e.type, e);
					}
				});
			});
		}
	}
	return this;
};