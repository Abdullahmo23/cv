jQuery(document).ready(function($) {
	'use strict';
	
	// Use the localized script data
	var importData = window.fwSettingsImport || {};
	var importId = importData.importId || '';
	
	if (!importId) {
		console.error('Import ID not found');
		return;
	}
	
	// Initialize import functionality when the option is ready
	fwEvents.on('fw:options:init', function(data) {
		if (data.$elements.find('#' + importId).length) {
			initImportFunctionality();
		}
	});
	
	function initImportFunctionality() {
		var $importContainer = $('#' + importId);
		if (!$importContainer.length) return;
		
		var $importButton = $importContainer.find('.settings-import-button');
		var $importTextarea = $importContainer.find('.settings-import-textarea');
		var $importType = $importContainer.find('input[name="import-type"]:checked');
		
		// Handle import button click
		$importButton.on('click', function(e) {
			e.preventDefault();
			
			var importType = $importType.val();
			var importDataValue = $importTextarea.val().trim();
			
			if (!importDataValue) {
				alert('Please enter import data or URL');
				return;
			}
			
			// Show loading
			$importButton.prop('disabled', true).text('Importing...');
			
			// Send AJAX request
			$.ajax({
				url: importData.ajaxUrl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'fw_backend_options_import',
					nonce: importData.nonce,
					type: importType,
					data: importDataValue
				},
				success: function(response) {
					$importButton.prop('disabled', false).text('Import Settings');
					
					if (response && response.success) {
						alert(response.data && response.data.message ? response.data.message : 'Import successful!');
						// Optional: reload the page to show new settings
						// location.reload();
					} else {
						var errorMsg = 'Import failed!';
						if (response && response.data && response.data.message) {
							errorMsg = response.data.message;
						}
						alert(errorMsg);
					}
				},
				error: function(xhr, status, error) {
					$importButton.prop('disabled', false).text('Import Settings');
					console.error('Import error:', status, error);
					alert('Error during import. Please try again.');
				}
			});
		});
		
		// Handle import type change
		$importContainer.find('input[name="import-type"]').on('change', function() {
			var type = $(this).val();
			var placeholder = type === 'url' ? 'Enter URL with settings data' : 'Paste settings data here';
			$importTextarea.attr('placeholder', placeholder);
		});
	}
	
	// If already initialized, run immediately
	if ($('#' + importId).length) {
		initImportFunctionality();
	}
});