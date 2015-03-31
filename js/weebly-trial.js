/* 
 * weebly-trial.css
 *
 * Weebly Trial Project
 * Tong Liu
 */

 function addPage() {
 	console.log('Add page button pressed!');
 	$.post('php/add_page.php', {pagename: $('#add-page-textfield').val()})
 }

 function editPage() {
 	console.log('Edit page button pressed');	
 }

 function deletePage() {
 	console.log('Delete page button pressed');
 }