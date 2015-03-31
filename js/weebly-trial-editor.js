/* 
 * weebly-trial-editor.js
 *
 * Weebly Trial Project
 * Javascript for drag and drop editor (right panel)
 *
 * Tong Liu
 */

 // http://blog.teamtreehouse.com/implementing-native-drag-and-drop
 // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop

function enableDragAndDrop() {
 	$('.icon').each(function() {
 		$(this)[0].addEventListener('dragstart', function(e) {
 			animatePickedUp(e);
 		});
 	});
 	$('.icon').each(function() {
 		$(this)[0].addEventListener('dragend', function(e) {
 			animateDropped(e);
 		});
 	});

 	$('#new-elt-drop')[0].addEventListener("dragover", function(e) {
		// Prevent default to allow drop
		e.preventDefault();
	}, false);

	// Event Listener for when the dragged element enters the drop zone.
	$('#new-elt-drop')[0].addEventListener('dragenter', function(e) {
		$('#new-elt-drop').addClass('drop-hover');
	});

	// Event Listener for when the dragged element leaves the drop zone.
	$('#new-elt-drop')[0].addEventListener('dragleave', function(e) {
		clearDrop();
	});

	$('#new-elt-drop')[0].addEventListener('drop', function(e) {
		switch (e.dataTransfer.getData('item')) {
			case 'Text':
				addTextBox();
				break;
			case 'Image':
				addImageBox();
				break;
			default:
				clearDrop();
				break;
		}
	});	
} 

function animatePickedUp(e) {
	$(e.target).css('opacity', '0');
	e.dataTransfer.setData('item', $(e.target).next().html());
	console.log(e.dataTransfer.getData('item'));
}

function animateDropped(e) {
	$(e.target).css('opacity', '1');
}

function addTextBox() {
	console.log('Gonna add a text box');
	clearDrop();
	var newId = $('#content').find('.elt').length;
	console.log('newID: ' + newId);
	var pageId = $('#pages-row').find('.page-row-item.selected').attr('data-page-id');
	$.post('php/add_page_elt.php', {type: 'text', elt_id: newId, page_id: pageId},
	function(data) {
		$('#new-elt-drop').before('\
			<div class="text-box editing elt" data-elt-id="' + newId + '">\
				<form class="edit-text-form" action="javascript: finalizeTextBox('
					+ pageId + ', ' + newId + ')">\
					<textarea rows="8" placeholder="Start typing here."></textarea>\
					<input type="submit" class="corner-button blue" value=""></input>\
				</form>\
			</div>\
		');
		hookTextEditListener(newId);
	});
}

function addImageBox() {
	console.log('Gonna add a image box');
	clearDrop();
	var newId = $('#content').find('.elt').length;
	console.log('newID: ' + newId);
	var pageId = $('#pages-row').find('.page-row-item.selected').attr('data-page-id');
	$.post('php/add_page_elt.php', {type: 'image', elt_id: newId, page_id: pageId},
	function() {
		getPageContent(pageId);
	});
}

function clearDrop() {
	$('#new-elt-drop').removeClass('drop-hover');
}

function hookTextEditListener(eID) {

}

function finalizeTextBox(pID, eID) {
	console.log('Done');
	var currElt = $('#content').find('.elt[data-elt-id="' + eID + '"]');
	var txt = currElt.find('textarea').val();
	console.log(txt);
	$.post('php/edit_text_content.php', {page_id: pID, elt_id: eID, text: txt},
	function() {
		$('.text-box.editing').removeClass('editing');
		currElt.html(txt);
	});
}

function getPageContent(pID) {
	$.post('php/get_page_content.php', {page_id: pID}, function(data) {
		$('#content').html(data);
		enableDragAndDrop();
	});
}