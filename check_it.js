(function($) {
	$.fn.check_it = function( options ) {
		var count = 0;
		var input_count = 0;
		var object = $(this);
		var checked, input_val;
		var settings = $.extend({
			toggle: 'no',
			toggle_div: '.type',
			field_toggle: 'no',
			toggle_speed: '',
			input_type: 'check',
			tabindex: 0
		}, options );
		function shipping_address(to, from, action) {
			var input_id;
			if( action == 'add' ) {
				$('.'+from+' input').each(function() {
					input_id = $(this).attr('id');
					input_id = input_id.replace( from, to );
					input_val = $(this).val();
					$('#'+input_id).val(input_val);
				});
				$('.'+from+' select').each(function() {
					select_id = $(this).attr('id');
					select_id = select_id.replace( from, to );
					select_val = $(this).find('option:selected').val();
					$('#'+select_id).find('option').removeAttr('selected');
					$('#'+select_id).find('option[value='+select_val+']').attr('selected', 'selected');
					$('#'+select_id).next('.select_it').find('li').removeClass('selected');
					$('#'+select_id).next('.select_it').find('li').each(function() {
						select_rel = $(this).attr('rel');
						if( select_val == select_rel ) {
							var new_displayed = $(this).text();
							$(this).parents('.select_it').find('.displayed').text(new_displayed);
							$(this).addClass('selected');
						}
					});
				});
			}
			if( action === 'remove' ) {
				$('.'+to+' input').each(function() {
					$(this).val('');
				});
			}
		}
		$(this).each(function() {
			count++;
			input_count++;
			$(this).hide();
			if( $(this).attr('tabindex') ) { tabindex = $(this).attr('tabindex'); } else { tabindex = settings.tabindex; }
			if( $(this).prop('checked') ) {
				checked = ' checked';
			} else {
				checked = '';
			}
			$(this).wrap('<div id="'+settings.input_type+'_'+count+'" class="'+settings.input_type+'_it'+checked+'" data-name="'+$(this).attr('name')+'" data-value="'+$(this).val()+'" tabindex="'+tabindex+'"></div><!--/'+settings.input_type+'_it-->');
			$(this).after('<span class="unchecked"></span><span class="checked icon"></span>');
			checked = '';
			$('.'+settings.input_type+'_it').keydown(function(e) {
				e.stopImmediatePropagation();
				current = $(this).attr('id');
				if( e.keyCode == 32 ) {
					if( settings.input_type == 'radio' ) {
						if( !$('#'+current).hasClass('checked') ) {
							$('.'+settings.input_type+'_it').removeClass('checked');
							var current_input_name = $(this).find(object.selector).attr('name');
							$(object.selector).each(function() {
								var input_name = $(this).attr('name');
								if( input_name === current_input_name ) { $(this).removeAttr('checked'); }
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
							$(this).find('input').removeAttr('checked');
						} else {
							if( settings.field_toggle == 'yes' ) {
								shipping_address( 'shipping', 'billing', 'add' );
							}
							$('#'+current).addClass('checked');
							element = '"'+object.selector+'"';
							$(this).find('input').attr('checked', true);
						}
					}
					return false;
				}
			});
			$('.'+settings.input_type+'_it').click(function(e) {
				e.stopImmediatePropagation();
				current = $(this).attr('id');
				if( settings.input_type == 'radio' ) {
					if( !$('#'+current).hasClass('checked') ) {
						$('.'+settings.input_type+'_it').removeClass('checked');
						var current_input_name = $(this).find(object.selector).attr('name');
						$(object.selector).each(function() {
							var input_name = $(this).attr('name');
							if( input_name === current_input_name ) { $(this).removeAttr('checked'); }
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
						$(this).find('input').removeAttr('checked');
					} else {
						if( settings.field_toggle == 'yes' ) {
							shipping_address( 'shipping', 'billing', 'add' );
						}
						$('#'+current).addClass('checked');
						element = '"'+object.selector+'"';
						$(this).find('input').attr('checked', true);
					}
				}
				return false;
			});
		});
		return this;
	}; //  END CHECK_IT FUNCTION
}(jQuery));