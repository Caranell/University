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
			<?php matrixBuildTable($reverseMatrix) ?>
		</div>
		<div class="container container-small">
			<?php matrixBuildTable($horReverseMatrix) ?>
		</div>
		<div class="container container-small">
			<?php matrixBuildTable($verReverseMatrix) ?>
		</div>
		<form action="<?= base_url("welcome/downloadFile") ?>" style="display: flex;" method="POST">
			<input type="hidden" name="answerMatrix" value="<?php $this->matrix_helper->matrixDownloadString($matrix) ?>">
			<button class="btn btn-primary" style="margin: 10 auto !important;" type="submit">download</button>
		</form>
	</div>
</body>

</html>

<!-- force_download('matrix.txt', )  -->