<?php
include "matrixMethods.php";
if ($_FILES["file"]["error"] > 0) {
	echo "Error: " . $_FILES["file"]["error"] . "<br />";
} else {
	$textLines = explode("\n",  file_get_contents($_FILES["file"]["tmp_name"]));
	for ($i = 0; $i < count($textLines) - 1; $i++) {
		$matrix[$i] = explode("\t", $textLines[$i]);
	}
	echo ("<div style='margin: 0 auto; width: 500px; text-align: center'>");

	echo ("<h2>Матрица из файла</h2>");
	matrixBuildTable($matrix);

	$matrixRows = matrixAlternRow($matrix);
	echo ("<h2>Чередование строк</h2>");
	matrixBuildTable($matrixRows);

	$matrixColumn = matrixTranspon(matrixAlternRow(matrixTranspon($matrix)));
	echo ("<h2>Чередование столбцов</h2>");
	matrixBuildTable($matrixColumn);

	echo ("</div>");
}
