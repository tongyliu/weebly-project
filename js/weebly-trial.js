/* 
 * weebly-trial.js
 *
 * Weebly Trial Project
 * General Javascript (onload, etc)
 *
 * Tong Liu
 */

$(document).ready(function() {
	// Set up sidebar buttons
	$('.ade-button.delete').click(deleteButtonListener);
	$('.ade-button.edit').click(editButtonListener);
	$('.ade-button.delete').hover(function() {
		$(this).parent().parent().css('background-color', '#d86a65');
	}, function() {
		$(this).parent().parent().css('background-color', '');
	});
	$('.page-col-item').click(setSelectedPage);

	// Set initially selected items
	$($('.left-col-content').find('.page-col-item')[0]).addClass('selected');
	$($('#pages-row').find('.page-row-item')[0]).addClass('selected');
	var id = $($('#pages-row').find('.page-row-item')[0]).attr('data-page-id');
	if (id !== undefined) {
		getPageContent(id);
	}
	else {
		$('#content').html('<h3>No pages to show.</h3>');
	}


});