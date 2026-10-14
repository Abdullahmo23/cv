jQuery(function($){

	fwEvents.on('fw:options:init', function (data) {

		var option_class = '.fw-backend-option-type-settings-export';

		var parent_class = '#fw-option-' + fw_export_id;

		var $elements = data.$elements.find(option_class +':not(.fw-option-initialized)');

		/** Init Import button */
		$elements.on('click', parent_class + '-copy-data', function(){
			$(parent_class + '-txt-copy-data').removeClass('fw-hidden');
			$(parent_class + '-txt-copy-url').addClass('fw-hidden');
		});

		$elements.on('click', parent_class + '-copy-url', function(){
			$(parent_class + '-txt-copy-url').removeClass('fw-hidden');
			$(parent_class + '-txt-copy-data').addClass('fw-hidden');
		});

	});

});