<html>

<head>
	<link rel="stylesheet" href="<?php echo base_url("assets/css/bootstrap.min.css"); ?>" />
</head>

<body>
	<div class="container container-small">
		<div class="container container-small">
			<?php $this->helper->matrixBuildTable($matrix) ?>
		</div>
		<div>
		</div>
		<div class="container container-small">
			<?php $this->helper->matrixBuildTable($reverseMatrix) ?>
		</div>
		<div class="container container-small">
			<?php $this->helper->matrixBuildTable($horReverseMatrix) ?>
		</div>
		<div class="container container-small">
			<?php $this->helper->matrixBuildTable($verReverseMatrix) ?>
		</div>
		<form action="">
			
		</form>
	</div>
</body>

</html>