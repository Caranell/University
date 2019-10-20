<html>

<head>
	<title>Upload Form</title>
</head>

<body>

	<div class="container center">
		<?php echo isset($error) ? $error : ''; ?>

		<?php echo form_open_multipart('welcome/uploadFile'); ?>

		<input type="file" name="userfile" size="20" />

		<br /><br />

		<button type="submit" class="btn btn-primary">Submit</button>

		</form>

	</div>

</body>

</html>