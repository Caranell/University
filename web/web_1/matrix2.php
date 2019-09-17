<?php
include "matrixMethods.php";
$matrix = $_POST['answerMatrix'];
if ($matrix != '') {
	$matrix = json_decode($_POST['answerMatrix']);
	echo ("<div style='margin: 0 auto; width: 500px; text-align: center'>");

	echo ("<h2>Матрица</h2>");
	matrixBuildTable($matrix);

	$matrixRows = matrixAlternRow($matrix);
	echo ("<h2>Чередование строк</h2>");
	matrixBuildTable($matrixRows);

	$matrixColumn = matrixTranspon(matrixAlternRow(matrixTranspon($matrix)));
	echo ("<h2>Чередование столбцов</h2>");
	matrixBuildTable($matrixColumn);

	echo ("</div>");
} else {
	echo '<body>
    <form action="upload.php" method="post" enctype="multipart/form-data">
      <label for="file">Filename:</label>
      <input type="file" name="file" id="file" /> 
      <input type="submit" name="submit" value="Submit" />
    </form>
  </body>';
}
