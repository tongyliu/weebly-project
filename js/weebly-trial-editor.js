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

function getPageId() {
	return $('#pages-row').find('.page-row-item.selected').attr('data-page-id');
}

function addTextBox() {
	console.log('Gonna add a text box');
	clearDrop();
	var newId = $('#content').find('.elt').length;
	console.log('newID: ' + newId);
	var pageId = getPageId();
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
	});
}

function addImageBox() {
	console.log('Gonna add a image box');
	clearDrop();
	var newId = $('#content').find('.elt').length;
	console.log('newID: ' + newId);
	var pageId = getPageId();
	$.post('php/add_page_elt.php', {type: 'image', elt_id: newId, page_id: pageId},
	function() {
		getPageContent(pageId);
	});
}

function clearDrop() {
	$('#new-elt-drop').removeClass('drop-hover');
}

function hookTextEditListener(pID, eID) {
	var currElt = $('.elt[data-elt-id="' + eID + '"]');
	var oldText = currElt.html();
	var height = currElt.css('height');
	currElt.click(function() {
		currElt.html('\
			<form style="height:' + height + '"\
				class="edit-text-form" action="javascript: finalizeTextBox('
				+ pID + ', ' + eID + ')">\
				<textarea style="height:100%">'+ oldText + '</textarea>\
				<input type="submit" class="corner-button blue" value=""></input>\
			</form>\
		');
		currElt.addClass('editing');
		currElt.unbind();
	});
}

function finalizeTextBox(pID, eID) {
	var currElt = $('.elt[data-elt-id="' + eID + '"]');
	var txt = currElt.find('textarea').val();
	$.post('php/edit_text_content.php', {page_id: pID, elt_id: eID, text: txt},
	function() {
		$('.text-box.editing').removeClass('editing');
		currElt.html(txt);
		hookTextEditListener(pID, eID);	
	});
}

function hookAllTextEdits() {
	var pageId = getPageId();
	$('.text-box.elt').each(function() {
		hookTextEditListener(pageId, $(this).attr('data-elt-id'));
	});
}

function getPageContent(pID) {
	$.post('php/get_page_content.php', {page_id: pID}, function(data) {
		$('#content').html(data);
		enableDragAndDrop();
		hookAllTextEdits();
	});
}