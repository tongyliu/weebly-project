<?php

require 'db_conn.php';

$name = $conn->real_escape_string($_POST['pagename']);
$id = $conn->real_escape_string($_POST['id']);

$sql = 'UPDATE weebly . pages SET pagename = "' . $name . '" WHERE pages . id = ' . $id;
$conn->query($sql);

$conn->close();

?>
