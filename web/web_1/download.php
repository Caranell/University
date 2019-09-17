<?php
header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=answerMatrix.txt");
$matrix = json_decode($_GET['answerMatrix']);
$size = count($matrix);
for ($i = 0; $i < $size; $i++) {
	$line = $matrix[$i][0];
	for ($j = 1; $j < $size; $j++) {
		$line .= "\t" . $matrix[$i][$j];
	}
	echo $line . "\n";
}
