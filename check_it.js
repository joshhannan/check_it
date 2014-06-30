(function( $ ) {
	$.fn.check_it = function( options ) {
		var object = $(this);
		object.each(function() {
			object.hide();
			object.parent().prepend('<div class="checkbox"><span class="unchecked active icon">&#xf096;</span><span class="checked hidden icon">&#xf046;</span></div>');
			$('.checkbox').click(function(){
				if( $(this).hasClass('toggled') ) {
					$('.checkbox .unchecked').removeClass('hidden').addClass('active');
					$('.checkbox .checked').removeClass('active').addClass('hidden');
					object.removeAttr('Checked');
					$(this).removeClass('toggled');
				} else {
					object.attr('checked', 'checked');
					$('.checkbox .unchecked').removeClass('active').addClass('hidden');
					$('.checkbox .checked').removeClass('hidden').addClass('active');
					$(this).addClass('toggled');
				}
			});
		});
	};  // END CHECK_IT FUNCTION
}(jQuery));