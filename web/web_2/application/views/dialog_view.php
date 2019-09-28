<html>

<head>
	<link rel="stylesheet" href="<?php echo base_url("assets/css/bootstrap.min.css"); ?>" />
</head>

<body>

	<div class="container center">
		<h2 class="title">Генерация матрицы</h2>
		<div class="notification is-danger">
			<?php echo validation_errors(); ?>
		</div>
		<form action="<?= base_url('welcome/matrix') ?>" method="POST">
			<div class="field">
				<label class="label">Размер</label>
				<div class="control">
					<input id="size" name="size" class="input" type="text" value="<?php echo set_value('size'); ?>" placeholder="Введите размерность матрицы">
				</div>
			</div>
			<div class="field is-grouped">
				<div class="control">
					<button class="button is-link" type="submit">Сгенерировать</button>
				</div>
			</div>
	</div>
</body>

</html>