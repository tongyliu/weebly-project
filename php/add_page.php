<?php

require 'db_conn.php';

$name = $conn->real_escape_string($_POST['pagename']);

$sql = 'INSERT INTO weebly . pages (pagename) VALUES (\'' . $name . '\')';
$conn->query($sql);

echo $conn->insert_id;

$conn->close();

?>
