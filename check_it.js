(function($) {
	$.fn.check_it = function( options ) {
		var count = 0;
		var input_count = 0;
		var object = $(this);
		var checked, input_val;
		var settings = $.extend({
			toggle: 'no',
			toggle_div: '.type',
			toggle_speed: '',
			input_type: 'check'
		}, options );
		function shipping_address(to, from, action) {
			var input_id;
			if( action == 'remove' ) {
				$(to+' input').each(function() {
					input_id = $(this).attr('id');
				});
			} else {
			}
		}
		$(this).each(function() {
			count++;
			input_count++;
			$(this).hide();
			if( $(this).prop('checked') ) {
				checked = ' checked';
			} else {
				checked = '';
			}
			$(this).wrap('<div id="'+settings.input_type+'_'+count+'" class="'+settings.input_type+'_it'+checked+'" data-name="'+$(this).attr('name')+'" data-value="'+$(this).val()+'"></div><!--/'+settings.input_type+'_it-->');
			$(this).after('<span class="unchecked"></span><span class="checked icon"></span>');
			checked = '';
			$('.'+settings.input_type+'_it').click(function(e) {
				e.stopImmediatePropagation();
				current = $(this).attr('id');
				if( settings.input_type == 'radio' ) {
					if( !$('#'+current).hasClass('checked') ) {
						$('.'+settings.input_type+'_it').removeClass('checked');
						var current_input_name = $(this).find(object.selector).attr('name');
						$(object.selector).each(function() {
							var input_name = $(this).attr('name');
							if( input_name === current_input_name ) { $(this).removeAttr('checked'); console.log('testing'); }
						});
						$(this).find(object.selector).attr('checked', true);
						$('#'+current).addClass('checked');
						if( settings.toggle == 'yes' ) {
							input_val = $(this).data('value');
							$(settings.toggle_div).hide();
							$(settings.toggle_div+'#'+input_val).show(settings.toggle_speed);
						}
					}
				} else {
					if( $('#'+current).hasClass('checked') ) {
						if( settings.field_toggle == 'yes' ) {
							shipping_address( '.billing', '.shipping', 'remove' );
						}
						$(this).removeClass('checked');
						$(this).prev(object.selector).removeAttr('checked');
					} else {
						if( settings.field_toggle == 'yes' ) {
							shipping_address( 'shipping', 'billing', 'add' );
						}
						$('#'+current).addClass('checked');
						element = '"'+object.selector+'"';
						$(this).prev(object.selector).attr('checked', true);
					}
				}
				return false;
			});
		});
		return this;
	}; //  END CHECK_IT FUNCTION
}(jQuery));