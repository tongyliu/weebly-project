/* 
 * weebly-trial.css
 *
 * Weebly Trial Project
 * Tong Liu
 */

 function addPageSubmit() {
 	console.log('Add page button pressed!');
 	console.log($('#add-page-textfield').val());
 	$.post('php/add_page.php', {pagename: $('#add-page-textfield').val()})
 }