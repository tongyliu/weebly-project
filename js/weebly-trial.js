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

 function editPage(id) {
 	console.log('Edit page button pressed');
 	console.log(id);
 	var currPageColItem = $("#edit-field").parent().parent();
 	var name = $('#edit-field').val();
 	var original = $('#edit-field').prop('placeholder');
 	if (name == "") name = original;
 	if (name != original)
 		$.post('php/edit-page.php', {id: id, pagename: name})
 	else console.log('same');
 	currPageColItem.html(
 		'<div class="label">' + name + '</div>\
		<div class="right-btn-wrap" style="display:inline-block; float: right">\
			<a class="ade-button edit light"></a>\
			<a class="ade-button delete light"></a>\
		</div>'
 	);	
 	// See http://stackoverflow.com/questions/3485365/
 	// A Webkit quirk
	currPageColItem.css('display', 'none').height();
	currPageColItem.css('display', 'block');
	// We have to re-add the click listeners
	currPageColItem.find('.ade-button.delete').click(deleteButtonListener);
 	currPageColItem.find('.ade-button.edit').click(editButtonListener);
 }

 function deletePage(id) {
 	console.log('Delete page button pressed');
 	$.post('php/delete_page.php', {id: id});
 }

function deleteButtonListener() {
	var pageID = $(this).parent().parent().attr('data-page-id');
	console.log('pageID: ' + pageID);
	deletePage(pageID);
}

function editButtonListener() {
	var currPageColItem = $(this).parent().parent();
	var pageID = currPageColItem.attr('data-page-id');
	var pageName = $(currPageColItem.children()[0]).html();
	console.log('pageID: ' + pageID);
	currPageColItem.html('\
		<form action="javascript: editPage(' + pageID + ')">\
			<input id="edit-field" class="page-textfield white" type="text"\
			placeholder="' + pageName + '">\
			<div class="right-btn-wrap">\
			<input type="submit" class="ade-button edit-submit light" value=""/>\
		</div>\
		</form>' 
	);	
	$('#edit-field').focus();
}

 $(document).ready(function() {
 	$('.ade-button.delete').click(deleteButtonListener);
 	$('.ade-button.edit').click(editButtonListener);
 });