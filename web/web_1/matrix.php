<?php
include "matrixMethods.php";

$matrixSize = $_GET['size'];
if ($matrixSize == '') $matrixSize = rand(4, 15);
$matrix = matrixGenerate($matrixSize);
echo ("<div style='margin: 0 auto; width: 500px; text-align: center'>");

echo ("<h2>Исходная матрица</h2>");

matrixBuildTable($matrix);
echo ("<h2>Определитель исходной матрицы</h2>");
echo (determinat($matrix, count($matrix) - 1));
echo ("<h2>Обратная матрица к исходной</h2>");

matrixBuildTable(matrixReverse($matrix));
$horMatrix = matrixSwapHor($matrix);

echo ("<h2>Матрица отраженная по горизонтали</h2>");
matrixBuildTable($horMatrix);

echo ("<h2>Матрица отраженная по вертикали</h2>");
$verMatrix = matrixSwapVer($matrix);
matrixBuildTable($verMatrix);

echo '<form style="margin-top: 25px;" method="POST" action="download.php">
		<input type="hidden" name="answerMatrix" value="' . json_encode($matrix) . '">
		<input type="submit" style="font-size: 18px" value="Сохранить">
</form>';
echo '<form style="margin-top: 25px;" method="POST" action="matrix2.php">
		<input type="hidden" name="answerMatrix" value="' . json_encode($matrix) . '">
		<input type="submit" style="font-size: 18px" value="Открыть matrix2">
</form>';
echo ("</div>");
