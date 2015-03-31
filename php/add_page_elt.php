<?php

require 'db_conn.php';

$page_id = $conn->real_escape_string($_POST['page_id']);
$elt_id = $conn->real_escape_string($_POST['elt_id']);
$elt_type = $conn->real_escape_string($_POST['type']);

$sql = 'INSERT INTO weebly . pageitems (page_id, page_elt_id, page_elt_type) VALUES (' .  $page_id . ', '
	. $elt_id . ', "' . $elt_type . '")';
$conn->query($sql);

$conn->close();

?>
