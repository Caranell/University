<html>

<head>
	<link rel="stylesheet" href="<?php echo base_url("assets/css/bootstrap.min.css"); ?>" />
</head>

<body>
	<div class="container container-small">
		<div class="container container-small">
			<?php matrixBuildTable($matrix) ?>
		</div>
		<div>
		</div>
		<div class="container container-small">
			<?php matrixBuildTable($matrixRows) ?>
		</div>
		<div class="container container-small">
			<?php matrixBuildTable($matrixColumns) ?>
		</div>
	</div>
</body>

</html>

<!-- force_download('matrix.txt', )  -->