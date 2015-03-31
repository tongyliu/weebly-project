<?php

require 'db_conn.php';

$page_id = $conn->real_escape_string($_POST['page_id']);

$sql = 'SELECT * FROM pageitems WHERE pageitems . page_id = ' . $page_id; 
$elts_table = $conn->query($sql);

foreach($elts_table as $row) {
	if ($row['page_elt_type'] == 'text') {
		echo('<div class="text-box elt" data-elt-id="' . $row['page_elt_id']  . '">');
		echo($row['page_elt_value']);
		echo('</div>');
	}
	else if ($row['page_elt_type'] == 'image') {
		echo('
			<div class="image elt" data-elt-id="' . $row['page_elt_id'] . '">
				<img class="image-placeholder" src="assets/sprites/Image-Placeholder@2x.png"
					alt="Placeholder"/>
				<div class="image-label">Add Image <span class="large">+</span></div>
			</div>
		');
	}
}

echo('<div id="new-elt-drop" class="elt"></div>');

$conn->close();

?>
