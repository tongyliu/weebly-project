/* 
 * weebly-trial.css
 *
 * Weebly Trial Project
 * Tong Liu
 */

 function addPage() {
 	console.log('Add page button pressed!');
 	var name = $('#add-page-textfield').val();
 	if (name != "") $.post('php/add_page.php', {pagename: name})

 }

 function editPage() {
 	console.log('Edit page button pressed');	
 }

 function deletePage(id) {
 	console.log('Delete page button pressed');
 	$.post('php/delete_page.php', {id: id});
 }

 $(document).ready(function() {
 	$('.ade-button.delete').click(function () {
 		var pageID = $(this).parent().parent().attr('data-page-id');
 		console.log('pageID: ' + pageID);
 		deletePage(pageID);
 	});

 	$('.ade-button.edit').click(function () {
 		var pageID = $(this).parent().parent().attr('data-page-id');
 		console.log('pageID: ' + pageID);
 		editPage(pageID);
 	});
 });