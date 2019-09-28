<?php

class Matrix_model extends CI_Model
{
	function matrixGenerate($size)
	{
		for ($i = 0; $i < $size; $i++) {
			for ($j = 0; $j < $size; $j++) {
				$matrixAns[$i][$j] = rand(0, 9);
			}
		}
		return $matrixAns;
	}

	function matrixBuildTable($matrix)
	{
		echo '<table style="width: 40% !important; margin: 30px auto !important;" class="table table-bordered table-sm">';
		foreach ($matrix as $key => $value) {
			echo "<tr>";
			foreach ($value as $key2 => $value2) {
				echo "<td>" . round($value2, 4) . "</td>";
			}
			echo "</tr>";
		}
		echo "</table>";
	}


	function matrixSwapHor($matrix)
	{
		$size = count($matrix);

		for ($i = 0; $i < $size; $i++) {
			for ($j = 0; $j < $size; $j++) {
				$matrixAns[$i][$j] = $matrix[$size - 1 - $i][$j];
			}
		}
		return $matrixAns;
	}

	function matrixSwapVer($matrix)
	{
		$size = count($matrix);

		for ($i = 0; $i < $size; $i++) {
			for ($j = 0; $j < $size; $j++) {
				$matrixAns[$i][$j] = $matrix[$i][$size - 1 - $j];
			}
		}
		return $matrixAns;
	}

	function matrixMult($x, $y)
	{
		for ($i = 0; $i < count($x[0]); $i++) {
			for ($j = 0; $j < count($y[0]); $j++) {
				for ($k = 0; $k < count($x[0]); $k++) {
					if (!isset($z[$i][$j])) $z[$i][$j] = 0;
					$z[$i][$j] += $x[$i][$k] * $y[$k][$j];
				}
			}
		}
		return $z;
	}

	function matrixAlternRow($matrix)
	{
		$size = count($matrix);
		for ($i = 0; $i < $size - ($size % 2); $i += 2) {
			$temp = $matrix[$i];
			$matrixAns[$i] = $matrix[$i + 1];
			$matrixAns[$i + 1] = $temp;
		}
		if ($size % 2 != 0) {
			$matrixAns[$size - 1] = $matrix[$size - 1];
		}
		return $matrixAns;
	}

	function minor($m1, $n, $i, $j)
	{
		for ($a = 0; $a < $n or $a == $n; $a++) {
			for ($b = 0; $b < $n or $b == $n; $b++) {
				if ($a < $i and $b < $j) {
					$r[$a][$b] = $m1[$a][$b];
				}

				if ($a < $i and $b > $j) {
					$r[$a][$b - 1] = $m1[$a][$b];
				}

				if ($a > $i and $b < $j) {
					$r[$a - 1][$b] = $m1[$a][$b];
				}

				if ($a > $i and $b > $j) {
					$r[$a - 1][$b - 1] = $m1[$a][$b];
				}
			}
		}

		return $r;
	}

	function Det($m0, $n)
	{

		$V1 = 0;
		if ($n == 0) {
			$V1 = $V1 + $$m0[0][0];
		}

		if ($n == 1) {
			$V1 = $V1 + ($m0[0][0] * $m0[1][1]) - ($m0[0][1] * $m0[1][0]);
		}

		if ($n > 1) {
			for ($a = 0; $a < 1; $a++) {
				for ($b = 0; $b < $n or $b == $n; $b++) {

					$mino = $this->minor($m0, $n, $a, $b);
					$c = $n - 1;

					$V1 = $V1 + $m0[0][$b] * pow((-1), 1 + $b + 1) * $this->Det($mino, $c);
				}
			}
		}
		return $V1;
	}

	function determinat($arrXX, $n)
	{

		switch ($n) {
			case 0:
				$V = $arrXX[0][0];
				return $V;
				break;

			case 1:
				$V = ($arrXX[0][0] * $arrXX[1][1]) - ($arrXX[0][1] * $arrXX[1][0]);
				return $V;
				break;
			default:
				$V = $this->Det($arrXX, $n);
				return $V;
		}
	}

	function matrixReverse($matrix)
	{
		$a = $matrix;
		$e = array();
		$count = count($a);
		for ($i = 0; $i < $count; $i++)
			for ($j = 0; $j < $count; $j++)
				$e[$i][$j] = ($i == $j) ? 1 : 0;

		for ($i = 0; $i < $count; $i++) {
			$tmp = $a[$i][$i];
			for ($j = $count - 1; $j >= 0; $j--) {
				@$e[$i][$j] /= $tmp;
				@$a[$i][$j] /= $tmp;
			}

			for ($j = 0; $j < $count; $j++) {
				if ($j != $i) {
					$tmp = $a[$j][$i];
					for ($k = $count - 1; $k >= 0; $k--) {
						$e[$j][$k] -= $e[$i][$k] * $tmp;
						$a[$j][$k] -= $a[$i][$k] * $tmp;
					}
				}
			}
		}
		return $e;
	}

	function matrixTranspon($matrix)
	{
		$size = count($matrix);
		for ($i = 0; $i < $size; $i++) {
			for ($j = 0; $j < $size; $j++) {
				$matrixAns[$j][$i] = $matrix[$i][$j];
			}
		}
		return $matrixAns;
	}
}
