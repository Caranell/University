<?php

class File_model extends CI_Model
{
	function encrypt($file)
	{
		$file_content = file_get_contents($file);
		$ciphertext = $this->encryption->encrypt($file_content);
		file_put_contents($file, $ciphertext);
	}
	function decrypt($file)
	{
		$file_content = file_get_contents($file);
		$normal_text = $this->encryption->decrypt($file_content);
		$textLines = explode("\n",  $normal_text);
		for ($i = 0; $i < count($textLines) - 1; $i++) {
			$matrix[$i] = explode("\t", $textLines[$i]);
		}
		return $matrix;
	}
}
