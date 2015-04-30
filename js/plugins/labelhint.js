$(function(){

	// Init - File Input 
	$('.lbl-hint').labelHint();

});


/*!
	* Label Hint v1.4
*/
(function($){
	$.fn.labelHint = function(options) {
		var $fieldWrap = $(this),
			onClass = "on",
			showClass = "show",
			theInput = $fieldWrap.find("input"),
			theTextarea = $fieldWrap.find("textarea"),
			theSelect = $fieldWrap.find("select");

		var changeState = function(){
			var label = $(this).closest($fieldWrap).find("label");
			if(this.value !== ""){
				label.addClass(showClass);
			} else {
				label.removeClass(showClass);
			}
		};

		// Setup "checkval" Event (same events to trigger on input/text area, different set of events for select drop-downs).
		theInput.add(theTextarea).bind("checkval", changeState);
		theSelect.bind("checkval", changeState);

		// Input/Textarea Triggers
		theInput.add(theTextarea).on("keyup",function(){
			$(this).trigger("checkval");
		}).on("focus",function(){
			$(this).closest($fieldWrap).find("label").addClass(onClass);
		}).on("blur",function(){
			$(this).closest($fieldWrap).find("label").removeClass(onClass);
		}).trigger("checkval");

		// Check State on value change
		theInput.add(theTextarea).on("change", changeState);
		// Select Triggers
		theSelect.on("change", changeState).trigger("checkval");

	}
})(jQuery);