<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('matrixBuildTable')) {
	function matrixBuildTable($matrix)
	{
		echo '<table style="width: 40% !important; margin: 30px auto !important;" class="table table-bordered table-sm table-striped">';
		foreach ($matrix as $key => $value) {
			echo "<tr>";
			foreach ($value as $key2 => $value2) {
				echo "<td>" . round($value2, 4) . "</td>";
			}
			echo "</tr>";
		}
		echo "</table>";
	}
}
