<!DOCTYPE html>

<?php
require 'php/db_conn.php';
?>

<head>
	<title>Weebly Trial Project</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css"/>
</head>

<body>
	<div id="top-bar">
		<img id="weebly-logo" src="assets/sprites/Weebly-Logo.png" alt="Weebly Logo"/>	
	</div>
	<div id="left-col">
		<div id="templates" class="col-item">
			<div class="left-col-header">Templates</div>
			<div class="left-col-content">
				<?php
				$pages_table = $conn->query('SELECT pagename FROM pages');
				foreach($pages_table as $row) {
					echo('<div class="page-col-item">' . $row['pagename'] . '</div>');
				}
				?>
				<div id="add-page-item" class="page-col-item">
					<form action="javascript: addPageSubmit()">
						<input id="add-page-textfield" type="text" placeholder="Add New Page">
						<div class="right-btn-wrap">
							<input type="submit" class="ade-button plus light" value=""/>
						</div>
					</form>
				</div>
			</div>	
		</div>
		<div id="elements" class="col-item">
			<div class="left-col-header">Elements</div>
			<div class="left-col-content">
				<div class="single-elt">
					<div id="title-icon" class="icon"></div>
					<div class="icon-title">Title</div>
				</div>
				<div class="single-elt">
					<div id="text-icon" class="icon"></div>
					<div class="icon-title">Text</div>
				</div>
				<div class="single-elt">
					<div id="img-icon" class="icon"></div>
					<div class="icon-title">Image</div>
				</div>
				<div class="single-elt">
					<div id="nav-icon" class="icon"></div>
					<div class="icon-title">Nav</div>
				</div>
			</div>	
		</div>
		<div id="settings" class="col-item">
			<div class="left-col-header">Settings</div>
			<div class="left-col-content"></div>	
		</div>
	</div>
	<div id="right-col">
		<div id="editor">
			<div id="pages-row">
				<?php
				foreach($pages_table as $row) {
					echo('<div class="page-row-item">' . $row['pagename'] . '</div>');
				}
				?>
			</div>
			<div class="add-image"></div>
			<div class="add-title"></div>
			<div class="add-text"></div>
		</div>
	</div>

	<script src="js/jquery-1.11.2.min.js" type="text/javascript"></script>
	<script src="js/weebly-trial.js" type="text/javascript"></script>
</body>

<?php
$conn->close();
?>
