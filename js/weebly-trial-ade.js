/* 
 * weebly-trial-ade.js
 *
 * Weebly Trial Project
 * Javascript for adding, deleting, and editing pages in the left sidebar
 *
 * Tong Liu
 */

function addPage() {
 	console.log('Add page button pressed!');
 	var name = $('#add-page-field').val();
 	if (name !== "") $.post('php/add_page.php', {pagename: name}, function(data) {
 		var addedItem = $('.page-col-item.add');
 		var pagesList = $('.page-col-item.add').parent();
 		addedItem.attr('data-page-id', data);
 		addedItem.html('\
			<div class="label">' + name + '</div>\
			<div class="right-btn-wrap">\
				<a class="ade-button edit light"></a>\
				<a class="ade-button delete light"></a>\
			</div>\
 		');
 		pagesList.css('max-height', pagesList.css('height'));
 		addedItem.css('background-color', '#4f657b');
 		addedItem.css('color', '#fff');
 		hookListeners(addedItem);
	 	setTimeout(function() {
	 		addedItem.removeClass('add');
	 		addedItem.after('\
	 			<div class="page-col-item add">\
					<form action="javascript: addPage()">\
						<input id="add-page-field"\
							class="page-textfield" type="text" placeholder="Add New Page">\
						<div class="right-btn-wrap">\
							<input type="submit" class="ade-button plus light" value=""/>\
						</div>\
					</form>\
				</div>\
		 	');
		 	var deltaH = $('.page-col-item.add').height() + 10;
		 	pagesList.css('max-height', pagesList.height() + deltaH);
	 	}, 500);
	 	$('#pages-row').html($('#pages-row').html() + '\
	 		<div class="page-row-item" data-page-id="' + data +  '"">' 
				+ name +  '</div>\
	 	');
	});
}

function editPage(id) {
 	console.log('Edit page button pressed');
 	console.log(id);
 	var currPageColItem = $("#edit-field").parent().parent();
 	var name = $('#edit-field').val();
 	var original = $('#edit-field').prop('placeholder');
 	if (name === '') name = original;
 	if (name != original) {
 		$.post('php/edit_page.php', {id: id, pagename: name}, function() {
 			$('#pages-row').find('.page-row-item[data-page-id="' + id + '"]').
 				html(name);
 		});
 	}
 	else console.log('same');
 	currPageColItem.html('\
		<div class="label">' + name + '</div>\
		<div class="right-btn-wrap">\
			<a class="ade-button edit light"></a>\
			<a class="ade-button delete light"></a>\
		</div>\
 	');	
 	hookListeners(currPageColItem);
}

function deletePage(id) {
 	console.log('Delete page button pressed');
 	$.post('php/delete_page.php', {id: id}, function(data) {
 		var deletedRow = $('.page-col-item[data-page-id="' + data + '"]');
 		var pagesList = deletedRow.parent();
 		pagesList.css('min-height', pagesList.height());
		var deltaH = deletedRow.height() + 10;
		deletedRow.css('opacity', 0);
		setTimeout(function() {
			deletedRow.remove();
			pagesList.css('min-height', pagesList.height() - deltaH);
		}, 500);
		$('.page-row-item[data-page-id="' + data + '"]').remove();
 	});
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
			<div class="right-btn-wrap" style="visibility:visible;">\
			<input type="submit" class="ade-button edit-submit light" value=""/>\
		</div>\
		</form>' 
	);	
	$('#edit-field').focus();
}

function setSelectedPage(e) {
	if (e.target == this || $(e.target).attr('class') == 'label') {
	 	$('.left-col-content').find('.page-col-item.selected')
			.removeClass('selected');
		$(this).addClass('selected');
		var id = $(this).attr('data-page-id');
		$('#pages-row').find('.page-row-item').removeClass('selected');
		$('#pages-row').find('.page-row-item[data-page-id="' + id + '"]')
		 	.addClass('selected');
		getPageContent(id);
	}
}

function hookListeners(item) {
 	// See http://stackoverflow.com/questions/3485365/
 	// A Webkit quirk
	item.css('display', 'none').height();
	item.css('display', 'block');
	item.css('background-color', ''); // Don't override '.selected'
	// We have to re-add the listeners
	item.find('.ade-button.delete').click(deleteButtonListener);
 	item.find('.ade-button.edit').click(editButtonListener);
 	item.find('.ade-button.delete').hover(function() {
 		item.css('background-color', '#d86a65');
 	}, function() {
 		 item.css('background-color', '');
 	});
	item.click(setSelectedPage);
}
