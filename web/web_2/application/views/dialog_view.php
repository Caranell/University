<html>

<head>
	<link rel="stylesheet" href="<?php echo base_url("assets/css/bootstrap.min.css"); ?>" />
</head>

<body>

	<div class="container center">
		<h2 align="center" class="title">Генерация матрицы</h2>
		<div class="alert alert-danger">
			<?php echo validation_errors(); ?>
		</div>
		<form action="<?= base_url('welcome/matrix') ?>" style="display: flex; flex-direction: column;" method="POST">
			<div class="field">
				<label class="label">Размер</label>
				<div class="control">
					<input id="size" name="size" class="form-control" type="text" value="<?php echo set_value('size'); ?>" placeholder="Введите размерность матрицы">
				</div>
			</div>
			<div class="field is-grouped">
				<div class="control" style="text-align: center;">
				<button class="btn btn-primary" style="margin: 15 auto;"type="submit">Сгенерировать</button>
				</div>
			</div>
	</div>
</body>

</html>