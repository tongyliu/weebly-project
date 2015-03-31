<?php

require 'db_conn.php';

$id = $conn->real_escape_string($_POST['id']);

$sql = 'DELETE FROM weebly . pages WHERE pages . id = ' . $id;
$conn->query($sql);
echo $id;

$conn->close();

?>
