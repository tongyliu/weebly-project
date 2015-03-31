<?php

require 'db_conn.php';

$page_id = $conn->real_escape_string($_POST['page_id']);
$elt_id = $conn->real_escape_string($_POST['elt_id']);
$text = $conn->real_escape_string($_POST['text']);

$sql = 'UPDATE weebly . pageitems SET page_elt_value = "' . $text . 
	'" WHERE pageitems . page_id = ' . $page_id .
	' AND pageitems . page_elt_id = ' . $elt_id;

$conn->query($sql);

$conn->close();

?>
